import sys
import os
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import (
    ChatMessageSerializer, 
    ChatResponseSerializer,
    QuestionGenerationSerializer,
    QuestionResponseSerializer
)

# Import the loader of the RAGPipeline
from .rag_loader import get_rag_pipeline, is_initialized
from django.db import transaction
from questions.models import Program, Track, Challenge, Source, ProblemQuestion, DiscursiveQuestion, MultipleChoiceQuestion, Question


class ChatbotChatView(APIView):
    """API endpoint for chatting with the RAG chatbot"""
    
    def post(self, request):
        # Handle different content types
        if request.content_type == 'text/plain':
            # If content is text/plain, try to parse as JSON
            try:
                import json
                data = json.loads(request.body.decode('utf-8'))
            except json.JSONDecodeError:
                # If not JSON, treat as plain text message
                data = {'message': request.body.decode('utf-8')}
        else:
            data = request.data
        """Handle chat messages"""
        serializer = ChatMessageSerializer(data=data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user_message = serializer.validated_data['message']
            
            # Use the loader to get the unique instance of the RAGPipeline
            pipeline = get_rag_pipeline()
            
            if pipeline is None:
                # Fallback response if it can't initialize
                response = f"Error processing. Automatic message for test."
                return Response({'response': response, 'confidence': 0.8}, status=status.HTTP_200_OK)
            
            # Get response from chatbot
            response = pipeline.chat(user_message)
            
            # Parse the JSON response from the RAG pipeline
            if isinstance(response, str):
                try:
                    response = json.loads(response)
                except json.JSONDecodeError:
                    return Response(
                        {"error": "Invalid question format from RAG pipeline"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )


            # Create response data
            response_data = {
                'response': response.get('response', ''),
                'confidence': response.get('confidence', 0.8),
                'sources': response.get('sources', []),
                'avg_score': response.get('avg_score', 0),
                'documents_used': response.get('documents_used', 0)
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": f"Error processing chat: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class QuestionGenerationView(APIView):
    """API endpoint for generating multiple choice questions"""
    
    def post(self, request):
        """Generate a multiple choice question"""
        serializer = QuestionGenerationSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            # Get data from serializer
            program_name = serializer.validated_data['program']
            track_name = serializer.validated_data['track']
            topic = serializer.validated_data['topic']
            difficulty = serializer.validated_data.get('difficulty', 'medium')
            type = serializer.validated_data.get('type', 'Discursiva')
            
            # Use the loader to get the unique instance of the RAGPipeline
            pipeline = get_rag_pipeline()
            
            if pipeline is None:
                # Fallback for when pipeline is not initialized
                return Response(
                    {"error": "RAG pipeline not initialized"}, 
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            
            # Generate question
            question_data = pipeline.generate_challenges_and_questions(topic, difficulty, type)
            
            # Parse the JSON response from the RAG pipeline
            if isinstance(question_data, str):
                try:
                    question_data = json.loads(question_data)
                except json.JSONDecodeError:
                    return Response(
                        {"error": "Invalid question format from RAG pipeline"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

            # Validate AI response before attempting DB writes
            if not isinstance(question_data, dict):
                return Response(
                    {"error": "Unexpected format from RAG pipeline"},
                    status=status.HTTP_502_BAD_GATEWAY
                )

            if question_data.get("error"):
                return Response(
                    {"error": question_data.get("error")},
                    status=status.HTTP_502_BAD_GATEWAY
                )

            required_top_level_keys = ["sources", "challenges", "questions"]
            missing_keys = [k for k in required_top_level_keys if k not in question_data]
            if missing_keys:
                return Response(
                    {"error": f"Missing keys in AI response: {', '.join(missing_keys)}"},
                    status=status.HTTP_502_BAD_GATEWAY
                )

            # --- Save to database ---
            try:
                with transaction.atomic():
                    # Map difficulty from "Médio" to "MEDIUM"
                    difficulty_map = {v: k for k, v in Question.Difficulty.choices}
                    difficulty_enum = difficulty_map.get(difficulty.capitalize(), Question.Difficulty.MEDIUM)

                    # Get or create Program and Track
                    program, _ = Program.objects.get_or_create(name=program_name.upper())
                    track, _ = Track.objects.get_or_create(program=program, name=track_name.capitalize())

                    # Create Challenge
                    challenge = Challenge.objects.create(
                        track=track,
                        title=f"{topic.capitalize()}",
                        difficulty=difficulty_enum,
                        status=Challenge.ChallengeStatus.PENDING
                    )

                    # Create and associate sources
                    source_objects = []
                    for source_data in question_data.get('sources', []):
                        source, _ = Source.objects.get_or_create(file_name=source_data['file_name'])
                        source_objects.append(source)
                    challenge.sources.add(*source_objects)
                    
                    # Create Discursive or Problem Questions based on type
                    is_calculation = str(type).strip().lower().startswith(('calc', 'cálc', 'c\u00e1lc'))
                    is_discursive = str(type).strip().lower().startswith(('disc', 'discur', 'discurs', 'discursiva'))
                    for pq_data in question_data.get('challenges', []):
                        if not all(key in pq_data for key in ['challenge', 'challenge_answer', 'challenge_justification']):
                            raise ValueError("Malformed 'challenges' item from AI response")
                        if is_discursive and not is_calculation:
                            DiscursiveQuestion.objects.create(
                                challenge=challenge,
                                statement=pq_data['challenge'],
                                answer_text=pq_data['challenge_answer'],
                                justification=pq_data['challenge_justification']
                            )
                        else:
                            # Parse decimal answer (accept formats with comma or dot)
                            from decimal import Decimal, InvalidOperation
                            import re
                            raw_answer = str(pq_data['challenge_answer'])
                            match = re.search(r"[-+]?\d+[\.,]?\d*", raw_answer)
                            if not match:
                                raise ValueError("challenge_answer must include a decimal number for calculation type")
                            normalized_number = match.group(0).replace(',', '.')
                            try:
                                decimal_answer = Decimal(normalized_number)
                            except InvalidOperation:
                                raise ValueError("Invalid decimal value in challenge_answer")
                            ProblemQuestion.objects.create(
                                challenge=challenge,
                                statement=pq_data['challenge'],
                                correct_answer=decimal_answer,
                                justification=pq_data['challenge_justification']
                            )
                    
                    # Create Multiple Choice Questions
                    for mcq_data in question_data.get('questions', []):
                        if not all(key in mcq_data for key in ['question', 'options', 'correct_answer', 'question_justification']):
                            raise ValueError("Malformed 'questions' item from AI response")
                        options = mcq_data['options']
                        if not isinstance(options, dict) or not all(k in options for k in ['A','B','C','D','E']):
                            raise ValueError("Options must include A, B, C, D, E")
                        MultipleChoiceQuestion.objects.create(
                            challenge=challenge,
                            statement=mcq_data['question'],
                            option_a=mcq_data['options']['A'],
                            option_b=mcq_data['options']['B'],
                            option_c=mcq_data['options']['C'],
                            option_d=mcq_data['options']['D'],
                            option_e=mcq_data['options']['E'],
                            correct_option=mcq_data['correct_answer'],
                            justification=mcq_data['question_justification']
                        )
            except Exception as e:
                # If database saving fails, return an error but don't expose details
                return Response(
                    {"error": f"Error saving generated challenge to the database: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
            # --- End of save to database ---

            # Return the persisted challenge with IDs so the frontend can edit
            from questions.serializers import ChallengeSerializer
            serialized = ChallengeSerializer(challenge)
            return Response(serialized.data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": f"Error generating question: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    rag_status = "initialized" if is_initialized() else "not_initialized"
    return Response({
        "status": "healthy", 
        "service": "chatbot-api",
        "rag_pipeline": rag_status
    }, status=status.HTTP_200_OK)

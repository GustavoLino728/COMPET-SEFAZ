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
            # Get topic and difficulty
            topic = serializer.validated_data['topic']
            difficulty = serializer.validated_data.get('difficulty', 'medium')
            type = serializer.validated_data.get('type', 'Discursiva')
            
            # Use the loader to get the unique instance of the RAGPipeline
            pipeline = get_rag_pipeline()
            
            if pipeline is None:
                # Fallback to mock response
                mock_question_data = {
                    'question': f"Mock question about {topic}",
                    'topic': topic,
                    'options': [
                        "A) First option",
                        "B) Second option", 
                        "C) Third option",
                        "D) Fourth option",
                        "E) Fifth option"
                    ],
                    'answer': "A) First option",
                    'explanation': f"This is a mock explanation for {topic}",
                    'difficulty': difficulty,
                    'type': type,
                    'sources': [],
                    'confidence': 'high',
                    'avg_score': 0,
                    'documents_used': 0
                }
                
                return Response(mock_question_data, status=status.HTTP_200_OK)
            
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
            
            # The output is now a complex JSON object, so we just return it directly.
            # The old QuestionResponseSerializer is not suitable for this new structure.
            return Response(question_data, status=status.HTTP_200_OK)
            
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

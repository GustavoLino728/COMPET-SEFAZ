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

# Add the chatbot module to the Python path
chatbot_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'chatbot', 'app')
sys.path.append(chatbot_path)

# Set the working directory to the project root for RAGPipeline
project_root = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
os.chdir(project_root)

try:
    from rag_pipeline.pipeline import RAGPipeline
except ImportError as e:
    print(f"Error importing RAGPipeline: {e}")
    RAGPipeline = None


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
        
        if RAGPipeline is None:
            # Return a mock response for testing
            user_message = serializer.validated_data['message']
            mock_response = f"Mock response: You said '{user_message}'. RAGPipeline is not available in this environment."
            
            response_data = {
                'response': str(mock_response),
                'confidence': 0.5
                
            }

            return Response(response_data, status=status.HTTP_200_OK)
        
        try:
            # Test with RAGPipeline using only a small subset of documents
            user_message = serializer.validated_data['message']
            
            # Initialize the RAG pipeline with a smaller document set
            test_docs_path = "/app/chatbot/app/data/sefaz_documents/general_content"
            
            # Check if test folder exists and has PDFs
            if os.path.exists(test_docs_path):
                print(f"Using documents from: {test_docs_path}")
                pipeline = RAGPipeline(documents_path=test_docs_path)
            else:
                print(f"Test path not found: {test_docs_path}")
                # Fallback to simple response
                response = f"Erro ao processar. Mensagem automática para teste."
                return Response({'response': response, 'confidence': 0.8}, status=status.HTTP_200_OK)
            
            # Initialize knowledge base with the smaller document set
            try:
                pipeline.build_knowledge_base(True)
                print("Knowledge base built successfully with test documents")
            except Exception as e:
                print(f"Warning: Could not build knowledge base: {e}")
                # Fallback response
                response = f"Teste com documentos limitados. Você disse: '{user_message}'"
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
        
        if RAGPipeline is None:
            # Return a mock question for testing
            topic = serializer.validated_data['topic']
            difficulty = serializer.validated_data.get('difficulty', 'medium')
            
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
                'difficulty': difficulty
            }
            
            return Response(mock_question_data, status=status.HTTP_200_OK)
        
        try:
            # Initialize the RAG pipeline with a smaller document set
            test_docs_path = "/app/chatbot/app/data/sefaz_documents/general_content"
            
            # Check if test folder exists and has PDFs
            if os.path.exists(test_docs_path):
                print(f"Using documents from: {test_docs_path}")
                pipeline = RAGPipeline(documents_path=test_docs_path)
            else:
                print(f"Test path not found: {test_docs_path}")
                # Fallback to mock response
                topic = serializer.validated_data['topic']
                difficulty = serializer.validated_data.get('difficulty', 'medium')
                
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
                    'question': "A) First option",
                    'explanation': f"This is a mock explanation for {topic}",
                    'difficulty': difficulty,
                    'sources': [],
                    'confidence': 'high',
                    'avg_score': 0,
                    'documents_used': 0
                }
                
                return Response(mock_question_data, status=status.HTTP_200_OK)
            
            # Initialize knowledge base if needed
            try:
                pipeline.build_knowledge_base(True)
            except Exception as e:
                print(f"Warning: Could not build knowledge base: {e}")
            
            # Get topic and difficulty
            topic = serializer.validated_data['topic']
            difficulty = serializer.validated_data.get('difficulty', 'medium')
            
            # Generate question
            question_data = pipeline.generate_multiple_choice_question(topic)
            
            # Parse the JSON response from the RAG pipeline
            if isinstance(question_data, str):
                try:
                    question_data = json.loads(question_data)
                except json.JSONDecodeError:
                    return Response(
                        {"error": "Invalid question format from RAG pipeline"}, 
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )
            
            # Format the response
            response_data = {
                'question': question_data.get('question', ''),
                'topic': topic,
                'options': question_data.get('options', []),
                'answer': question_data.get('answer', ''),
                'explanation': question_data.get('explanation', ''),
                'difficulty': difficulty,
                'sources': question_data.get('sources', []),
                'confidence': question_data.get('confidence', ''),
                'avg_score': question_data.get('avg_score', 0),
                'documents_used': question_data.get('documents_used', 0)
            }
            
            return Response(response_data, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response(
                {"error": f"Error generating question: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


@api_view(['GET'])
def health_check(request):
    """Health check endpoint"""
    return Response({"status": "healthy", "service": "chatbot-api"}, status=status.HTTP_200_OK)

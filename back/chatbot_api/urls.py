from django.urls import path
from .views import ChatbotChatView, QuestionGenerationView, health_check

app_name = 'chatbot_api'

urlpatterns = [
    # Health check endpoint
    path('health/', health_check, name='health_check'),
    
    # Chat endpoint
    path('chat/', ChatbotChatView.as_view(), name='chat'),
    
    # Question generation endpoint
    path('generate-question/', QuestionGenerationView.as_view(), name='generate_question'),
] 
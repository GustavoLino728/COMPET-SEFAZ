from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Question, Option
from .serializers import (
    QuestionSerializer, 
    QuestionCreateSerializer, 
    QuestionUpdateSerializer,
    OptionSerializer
)

class QuestionViewSet(viewsets.ModelViewSet):
    """
    ViewSet to manage multiple choice questions
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [AllowAny]  # Temporarily for development
    
    def get_serializer_class(self):
        if self.action == 'create':
            return QuestionCreateSerializer
        elif self.action in ['update', 'partial_update']:
            return QuestionUpdateSerializer
        return QuestionSerializer
    
    def list(self, request):
        """List all questions"""
        questions = self.get_queryset()
        serializer = self.get_serializer(questions, many=True)
        return Response({
            'count': questions.count(),
            'results': serializer.data
        })
    
    def retrieve(self, request, pk=None):
        """Get a specific question"""
        question = get_object_or_404(Question, pk=pk)
        serializer = self.get_serializer(question)
        return Response(serializer.data)
    
    def create(self, request):
        """Create a new question"""
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            question = serializer.save()
            return Response(
                QuestionSerializer(question).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, pk=None):
        """Update a question"""
        question = get_object_or_404(Question, pk=pk)
        serializer = self.get_serializer(question, data=request.data)
        if serializer.is_valid():
            question = serializer.save()
            return Response(QuestionSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        """Delete a question"""
        question = get_object_or_404(Question, pk=pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=False, methods=['get'])
    def by_topic(self, request):
        """List questions by topic"""
        topic = request.query_params.get('topic', '')
        if topic:
            questions = self.get_queryset().filter(topic__icontains=topic)
        else:
            questions = self.get_queryset()
        
        serializer = self.get_serializer(questions, many=True)
        return Response({
            'topic': topic,
            'count': questions.count(),
            'results': serializer.data
        })
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """List only active questions"""
        questions = self.get_queryset().filter(is_active=True)
        serializer = self.get_serializer(questions, many=True)
        return Response({
            'count': questions.count(),
            'results': serializer.data
        })

from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from .models import Question, Option, Challenge
from .serializers import (
    QuestionSerializer, 
    QuestionCreateSerializer, 
    QuestionUpdateSerializer,
    OptionSerializer,
    ChallengeSerializer,
    ChallengeUpdateStatusSerializer
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

class PendingChallengeListView(generics.ListAPIView):
    """
    API endpoint to list all challenges with PENDING status.
    """
    queryset = Challenge.objects.filter(status=Challenge.ChallengeStatus.PENDING).order_by('-id')
    serializer_class = ChallengeSerializer
    permission_classes = [AllowAny] # TODO: Change to IsAdminUser or similar in production

class ChallengeDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint to retrieve, update (approve), or delete (reject) a challenge.
    """
    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [AllowAny] # TODO: Change to IsAdminUser or similar in production

    def get_serializer_class(self):
        if self.request.method == 'PATCH':
            return ChallengeUpdateStatusSerializer
        return ChallengeSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        # Ensure only status can be updated via PATCH
        if 'status' in serializer.validated_data and len(serializer.validated_data) == 1:
            if serializer.validated_data['status'] == Challenge.ChallengeStatus.APPROVED:
                self.perform_update(serializer)
                return Response(serializer.data)
            else:
                return Response(
                    {"error": "This endpoint only allows changing the status to APPROVED."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(
            {"error": "Only the 'status' field can be updated to 'APPROVED' via PATCH."},
            status=status.HTTP_400_BAD_REQUEST
        )

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        # Only pending challenges can be rejected (deleted)
        if instance.status == Challenge.ChallengeStatus.PENDING:
            self.perform_destroy(instance)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(
            {"error": "Only challenges with PENDING status can be rejected."},
            status=status.HTTP_400_BAD_REQUEST
        )

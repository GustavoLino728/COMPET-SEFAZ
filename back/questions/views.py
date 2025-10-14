from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from django.db.models import Q
import random
from .models import Question, Option, Challenge, ProblemQuestion, DiscursiveQuestion, MultipleChoiceQuestion, Program, Track
from .serializers import (
    QuestionSerializer, 
    QuestionCreateSerializer, 
    QuestionUpdateSerializer,
    OptionSerializer,
    ChallengeSerializer,
    ChallengeUpdateStatusSerializer,
    ProblemQuestionSerializer,
    DiscursiveQuestionSerializer,
    MultipleChoiceQuestionSerializer,
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

class AllChallengesListView(generics.ListAPIView):
    """
    API endpoint to list all challenges.
    """
    queryset = Challenge.objects.all().order_by('-id')
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

class ProblemQuestionDetailView(generics.RetrieveUpdateAPIView):
    queryset = ProblemQuestion.objects.all()
    serializer_class = ProblemQuestionSerializer
    permission_classes = [AllowAny]

class DiscursiveQuestionDetailView(generics.RetrieveUpdateAPIView):
    queryset = DiscursiveQuestion.objects.all()
    serializer_class = DiscursiveQuestionSerializer
    permission_classes = [AllowAny]

class MultipleChoiceQuestionDetailView(generics.RetrieveUpdateAPIView):
    queryset = MultipleChoiceQuestion.objects.all()
    serializer_class = MultipleChoiceQuestionSerializer
    permission_classes = [AllowAny]

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

class CertificateQuestionsView(generics.GenericAPIView):
    """
    API endpoint to get 5 random problem questions for certificate tests
    """
    permission_classes = [AllowAny]
    
    def get(self, request):
        program_name = request.query_params.get('program', '')
        track_name = request.query_params.get('track', '')
        
        if not program_name or not track_name:
            return Response(
                {"error": "Both 'program' and 'track' parameters are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Find the program and track
            program = Program.objects.get(name__iexact=program_name)
            track = Track.objects.get(program=program, name__iexact=track_name)
            
            # Get approved challenges for this track with HARD difficulty only
            challenges = Challenge.objects.filter(
                track=track,
                status=Challenge.ChallengeStatus.APPROVED,
                difficulty='HARD'  # Only HARD difficulty for certificates
            )
            
            # Get all problem questions from these challenges
            problem_questions = ProblemQuestion.objects.filter(
                challenge__in=challenges
            ).select_related('challenge')
            
            # Check if there are at least 5 problem questions available
            total_questions = problem_questions.count()
            if total_questions < 5:
                return Response(
                    {
                        "error": f"Not enough problem questions available for certificate. Found {total_questions} questions, need at least 5. Please create more challenges with calculation questions for this program and track.",
                        "total_available": total_questions,
                        "required": 5,
                        "program": program_name,
                        "track": track_name
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Randomly select 5 questions
            selected_questions = random.sample(list(problem_questions), 5)
            
            # Serialize the questions
            serializer = ProblemQuestionSerializer(selected_questions, many=True)
            
            return Response({
                "questions": serializer.data,
                "total_questions": len(selected_questions),
                "program": program_name,
                "track": track_name
            })
            
        except Program.DoesNotExist:
            return Response(
                {"error": f"Program '{program_name}' not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Track.DoesNotExist:
            return Response(
                {"error": f"Track '{track_name}' not found for program '{program_name}'"},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

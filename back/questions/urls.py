from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, PendingChallengeListView, AllChallengesListView, ChallengeDetailView, ProblemQuestionDetailView, DiscursiveQuestionDetailView, MultipleChoiceQuestionDetailView, CertificateQuestionsView

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='question')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/challenges/', AllChallengesListView.as_view(), name='all-challenges'),
    path('api/challenges/pending/', PendingChallengeListView.as_view(), name='pending-challenges'),
    path('api/challenges/<int:pk>/', ChallengeDetailView.as_view(), name='challenge-detail'),
    path('api/problem-questions/<int:pk>/', ProblemQuestionDetailView.as_view(), name='problem-question-detail'),
    path('api/discursive-questions/<int:pk>/', DiscursiveQuestionDetailView.as_view(), name='discursive-question-detail'),
    path('api/mc-questions/<int:pk>/', MultipleChoiceQuestionDetailView.as_view(), name='mc-question-detail'),
    path('api/certificate-questions/', CertificateQuestionsView.as_view(), name='certificate-questions'),
]

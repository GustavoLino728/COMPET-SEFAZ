from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuestionViewSet, PendingChallengeListView, ChallengeDetailView

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'questions', QuestionViewSet, basename='question')

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/challenges/pending/', PendingChallengeListView.as_view(), name='pending-challenges'),
    path('api/challenges/<int:pk>/', ChallengeDetailView.as_view(), name='challenge-detail'),
]

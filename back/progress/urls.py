from django.urls import path
from . import views

app_name = 'progress'

urlpatterns = [
    # Progress tracking
    path('track/', views.track_trail_access, name='track_trail_access'),
    path('user/', views.get_user_progress, name='get_user_progress'),
    path('program/<str:program>/', views.get_program_progress, name='get_program_progress'),
    
    # Badge system
    path('challenges/complete/', views.complete_challenge, name='complete_challenge'),
    path('badges/', views.get_user_badges, name='get_user_badges'),
    path('badges/stats/', views.get_badge_stats, name='get_badge_stats'),
    
    # Certificate system
    path('certificates/submit/', views.submit_certificate_test, name='submit_certificate_test'),
    path('certificates/', views.get_user_certificates, name='get_user_certificates'),
    path('certificates/completed/', views.get_completed_certificates, name='get_completed_certificates'),
    path('certificates/persistent/', views.get_user_certificates_persistent, name='get_user_certificates_persistent'),
]

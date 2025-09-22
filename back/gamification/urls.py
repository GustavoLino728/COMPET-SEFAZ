from django.urls import path
from . import views

app_name = 'gamification'

urlpatterns = [
    path('trail/completion/', views.record_trail_completion, name='trail_completion'),
    path('trail/recommendations/', views.trail_recommendations, name='trail_recommendations'),
    path('user/stats/', views.user_stats, name='user_stats'),  
    path('user/badges/', views.user_badges, name='user_badges'),
    path('certificates/', views.list_certificates, name='list_certificates'),
    path('user/certificates/', views.user_certificates, name='user_certificates'),
    path('certificate/award/', views.award_certificate, name='award_certificate'),
]

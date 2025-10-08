from django.urls import path
from . import views

app_name = 'progress'

urlpatterns = [
    path('track/', views.track_trail_access, name='track_trail_access'),
    path('user/', views.get_user_progress, name='get_user_progress'),
    path('program/<str:program>/', views.get_program_progress, name='get_program_progress'),
]
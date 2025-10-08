from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db import transaction
from django.db import models
from .models import TrailAccess, UserProgramProgress, UserOverallProgress
from .serializers import (
    TrackTrailAccessSerializer, 
    UserProgramProgressSerializer,
    UserOverallProgressSerializer,
    TrailAccessSerializer
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def track_trail_access(request):
    """
    Registra o acesso do usuário a uma trilha
    """
    serializer = TrackTrailAccessSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    user = request.user
    
    try:
        with transaction.atomic():
            trail_access, created = TrailAccess.objects.get_or_create(
                user=user,
                trail_id=data['trail_id'],
                defaults={
                    'program': data['program'],
                    'trail_number': data['trail_number'],
                }
            )
            
            if not created:
                trail_access.access_count += 1
                trail_access.last_access = timezone.now()
                trail_access.save()
                
            program_progress, _ = UserProgramProgress.objects.get_or_create(
                user=user,
                program=data['program'],
            )
            
            if data['trail_number'] not in program_progress.trails_accessed:
                program_progress.trails_accessed.append(data['trail_number'])
                program_progress.trails_accessed.sort()
            
            program_progress.last_accessed_trail = max(
                program_progress.last_accessed_trail, 
                data['trail_number']
            )
            
            program_progress.total_access_count = TrailAccess.objects.filter(
                user=user, program=data['program']
            ).aggregate(
                total=models.Sum('access_count')
            )['total'] or 0
            
            program_progress.save()
      
            overall_progress, _ = UserOverallProgress.objects.get_or_create(
                user=user
            )
            overall_progress.update_stats()
            
            return Response({
                'status': 'success',
                'message': 'Acesso registrado com sucesso',
                'trail_access': {
                    'trail_id': trail_access.trail_id,
                    'access_count': trail_access.access_count,
                    'is_first_access': created
                },
                'program_progress': {
                    'program': program_progress.program,
                    'progress_percentage': program_progress.progress_percentage,
                    'trails_accessed': program_progress.trails_accessed,
                    'next_trail': program_progress.next_trail
                }
            }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'error': 'Erro interno do servidor',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_progress(request):
    """
    Retorna o progresso completo do usuário
    """
    user = request.user
    
    program_progresses = UserProgramProgress.objects.filter(user=user)
    program_data = UserProgramProgressSerializer(program_progresses, many=True).data
    
    overall_progress, _ = UserOverallProgress.objects.get_or_create(user=user)
    overall_progress.update_stats() 
    overall_data = UserOverallProgressSerializer(overall_progress).data
    
    recent_accesses = TrailAccess.objects.filter(
        user=user
    ).order_by('-last_access')[:10]
    recent_data = TrailAccessSerializer(recent_accesses, many=True).data
    
    return Response({
        'program_progress': program_data,
        'overall_progress': overall_data,
        'recent_accesses': recent_data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_program_progress(request, program):
    """
    Retorna progresso específico de um programa
    """
    try:
        progress = UserProgramProgress.objects.get(
            user=request.user, 
            program=program.upper()
        )
        serializer = UserProgramProgressSerializer(progress)
        return Response(serializer.data)
    
    except UserProgramProgress.DoesNotExist:
        return Response({
            'program': program.upper(),
            'progress_percentage': 0.0,
            'trails_accessed': [],
            'is_completed': False,
            'next_trail': 1
        })
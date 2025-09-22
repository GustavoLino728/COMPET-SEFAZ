from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from .models import Certificate, UserCertificate, UserStats, Trail
from .services import ProgressService, BadgeService, CertificateService
from .serializers import (
    CertificateSerializer, UserCertificateSerializer, UserStatsSerializer,
    UserBadgeSerializer, TrailSerializer
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def record_trail_completion(request):
    """Registra conclusão da trilha - apenas badges"""
    current_url = request.data.get('current_url')
    trail_slug = request.data.get('trail_slug')
    
    if current_url:
        result = ProgressService.record_trail_completion_by_url(request.user, current_url)
    elif trail_slug:
        try:
            result = ProgressService.record_trail_completion_by_slug(request.user, trail_slug)
        except ValueError as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(
            {'error': 'current_url ou trail_slug é obrigatório'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if result is None:
        return Response(
            {'error': 'Trilha não encontrada para esta URL'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Apenas badges, sem certificados
    new_badges = []
    if result['first_completion']:
        new_badges = BadgeService.check_and_award_badges(request.user)
    
    return Response({
        'success': True,
        'trail': {
            'title': result['trail'].title,
            'program': result['trail'].program.display_name
        },
        'first_completion': result['first_completion'],
        'new_badges': [
            {
                'name': badge.badge_type.name,
                'description': badge.badge_type.description,
                'image': badge.badge_type.image.url if badge.badge_type.image else None
            } 
            for badge in new_badges
        ]
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats(request):
    """Retorna estatísticas do usuário"""
    stats, _ = UserStats.objects.get_or_create(user=request.user)
    stats.update_stats()
    
    return Response(UserStatsSerializer(stats).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_badges(request):
    """Retorna badges do usuário"""
    badges = request.user.badges.select_related('badge_type')
    return Response(UserBadgeSerializer(badges, many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trail_recommendations(request):
    """Retorna trilhas recomendadas"""
    recommendations = ProgressService.get_user_recommendations(request.user)
    return Response(TrailSerializer(recommendations, many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_certificates(request):
    """Lista todos os certificados disponíveis"""
    certificates = Certificate.objects.filter(is_active=True)
    return Response(CertificateSerializer(certificates, many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_certificates(request):
    """Certificados do usuário"""
    certificates = request.user.certificates.filter(is_active=True).select_related('certificate')
    return Response(UserCertificateSerializer(certificates, many=True).data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def award_certificate(request):
    """Concede certificado manualmente (apenas admins)"""
    certificate_id = request.data.get('certificate_id')
    user_id = request.data.get('user_id')
    notes = request.data.get('notes', '')
    
    if not certificate_id or not user_id:
        return Response(
            {'error': 'certificate_id e user_id são obrigatórios'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        user_certificate = CertificateService.award_certificate_to_user(
            certificate_id=certificate_id,
            user_id=user_id,
            issued_by_user=request.user,
            notes=notes
        )
        
        if user_certificate:
            return Response({
                'success': True,
                'message': 'Certificado concedido com sucesso',
                'certificate': UserCertificateSerializer(user_certificate).data
            })
        else:
            return Response(
                {'error': 'Usuário já possui este certificado'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

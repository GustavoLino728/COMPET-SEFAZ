from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db import transaction
from django.db import models

from .models import (
    TrailAccess, UserProgramProgress, UserOverallProgress,
    ChallengeCompletion, UserBadge, UserBadgeStats, BadgeDefinition,
    CertificateTest
)
from .serializers import (
    TrackTrailAccessSerializer, 
    UserProgramProgressSerializer,
    UserOverallProgressSerializer,
    TrailAccessSerializer,
    CertificateTestSubmissionSerializer,
    CertificateTestSerializer
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
            # 1. Registrar/atualizar acesso à trilha
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
            
            # 2. Atualizar progresso do programa
            program_progress, _ = UserProgramProgress.objects.get_or_create(
                user=user,
                program=data['program'],
            )
            
            # Adicionar trilha se não estiver na lista
            if data['trail_number'] not in program_progress.trails_accessed:
                program_progress.trails_accessed.append(data['trail_number'])
                program_progress.trails_accessed.sort()
            
            # Atualizar última trilha acessada
            program_progress.last_accessed_trail = max(
                program_progress.last_accessed_trail, 
                data['trail_number']
            )
            
            # Recalcular total de acessos do programa
            program_progress.total_access_count = TrailAccess.objects.filter(
                user=user, program=data['program']
            ).aggregate(
                total=models.Sum('access_count')
            )['total'] or 0
            
            program_progress.save()
            
            # 3. Atualizar/criar progresso geral
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
    
    # Progresso por programa
    program_progresses = UserProgramProgress.objects.filter(user=user)
    program_data = UserProgramProgressSerializer(program_progresses, many=True).data
    
    # Progresso geral
    overall_progress, _ = UserOverallProgress.objects.get_or_create(user=user)
    overall_progress.update_stats()  # Garantir dados atualizados
    overall_data = UserOverallProgressSerializer(overall_progress).data
    
    total_challenges = ChallengeCompletion.objects.filter(user=user).count()
    
    # Acessos recentes (últimos 10)
    recent_accesses = TrailAccess.objects.filter(
        user=user
    ).order_by('-last_access')[:10]
    recent_data = TrailAccessSerializer(recent_accesses, many=True).data
    
    return Response({
        'program_progress': program_data,
        'overall_progress': overall_data,
        'recent_accesses': recent_data,
        'total_challenges_completed': total_challenges,
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_challenge(request):
    """
    Registra a conclusão de um desafio e concede badge se aplicável
    """
    serializer_data = request.data
    user = request.user
    
    required_fields = ['program', 'trail_number', 'difficulty', 'score']
    if not all(field in serializer_data for field in required_fields):
        return Response({
            'error': 'Campos obrigatórios: program, trail_number, difficulty, score'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
            # Verificar se já completou este desafio
            completion, created = ChallengeCompletion.objects.get_or_create(
                user=user,
                program=serializer_data['program'],
                trail_number=serializer_data['trail_number'],
                difficulty=serializer_data['difficulty'],
                defaults={
                    'challenge_id': serializer_data.get('challenge_id'),
                    'score': serializer_data['score'],
                    'completion_time_seconds': serializer_data.get('completion_time_seconds'),
                }
            )
            
            badge_earned = None
            if created:  # Primeira conclusão
                # Buscar definição do badge correspondente
                try:
                    badge_def = BadgeDefinition.objects.get(
                        program=serializer_data['program'],
                        trail_number=serializer_data['trail_number'],
                        difficulty=serializer_data['difficulty'],
                        is_active=True
                    )
                    
                    # Criar badge para o usuário
                    user_badge = UserBadge.objects.create(
                        user=user,
                        badge_definition=badge_def,
                        challenge_completion=completion
                    )
                    
                    # Atualizar estatísticas de badges
                    badge_stats, _ = UserBadgeStats.objects.get_or_create(user=user)
                    badge_stats.update_stats()
                    
                    badge_earned = {
                        'id': user_badge.id,
                        'name': badge_def.name,
                        'image_url': badge_def.badge_image_url,
                        'image_path': badge_def.badge_image,
                        'type': badge_def.badge_type,
                        'description': badge_def.description
                    }
                    
                except BadgeDefinition.DoesNotExist:
                    # Badge definition não existe - pode acontecer se não rodou o command
                    pass
            else:
                # Atualizar tentativas se não é primeira vez
                completion.attempts += 1
                completion.save()
            
            return Response({
                'status': 'success',
                'completion_id': completion.id,
                'is_first_completion': created,
                'badge_earned': badge_earned,
                'score': float(completion.score),
                'attempts': completion.attempts
            }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
    
    except Exception as e:
        return Response({
            'error': 'Erro interno do servidor',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_badges(request):
    """
    Retorna todos os badges do usuário com URLs de imagem
    """
    user_badges = UserBadge.objects.filter(user=request.user).select_related(
        'badge_definition', 'challenge_completion'
    ).order_by('-earned_at')
    
    badges_data = []
    for badge in user_badges:
        badges_data.append({
            'id': badge.id,
            'name': badge.badge_definition.name,
            'description': badge.badge_definition.description,
            'image_url': badge.badge_definition.badge_image_url,  # URL da imagem
            'image_path': badge.badge_definition.badge_image,     # Caminho relativo
            'type': badge.badge_definition.badge_type,
            'program': badge.badge_definition.program,
            'trail_number': badge.badge_definition.trail_number,
            'difficulty': badge.badge_definition.difficulty,
            'earned_at': badge.earned_at,
            'score': float(badge.challenge_completion.score) if badge.challenge_completion.score else None,
        })
    
    # Estatísticas
    badge_stats, _ = UserBadgeStats.objects.get_or_create(user=request.user)
    badge_stats.update_stats()
    
    return Response({
        'badges': badges_data,
        'stats': {
            'total_badges': badge_stats.total_badges,
            'bronze_badges': badge_stats.bronze_badges,
            'silver_badges': badge_stats.silver_badges,
            'gold_badges': badge_stats.gold_badges,
            'completion_percentage': float(badge_stats.completion_percentage),
            'proind_badges': badge_stats.proind_badges,
            'prodepe_badges': badge_stats.prodepe_badges,
            'prodeauto_badges': badge_stats.prodeauto_badges,
            'first_badge_earned': badge_stats.first_badge_earned,
            'last_badge_earned': badge_stats.last_badge_earned,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_available_badges(request):
    """
    Retorna badges disponíveis com URLs de imagem
    """
    # Badges já conquistados
    earned_badge_ids = UserBadge.objects.filter(user=request.user).values_list(
        'badge_definition_id', flat=True
    )
    
    # Badges disponíveis
    available_badges = BadgeDefinition.objects.filter(
        is_active=True
    ).exclude(id__in=earned_badge_ids).order_by('program', 'trail_number', 'difficulty')
    
    available_data = []
    for badge in available_badges:
        available_data.append({
            'id': badge.id,
            'name': badge.name,
            'description': badge.description,
            'image_url': badge.badge_image_url,  # URL da imagem
            'image_path': badge.badge_image,     # Caminho relativo
            'type': badge.badge_type,
            'program': badge.program,
            'trail_number': badge.trail_number,
            'difficulty': badge.difficulty,
        })
    
    return Response({
        'available_badges': available_data,
        'total_available': len(available_data),
        'total_possible': BadgeDefinition.objects.filter(is_active=True).count()
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_badge_stats(request):
    """
    Retorna estatísticas detalhadas de badges do usuário
    """
    badge_stats, _ = UserBadgeStats.objects.get_or_create(user=request.user)
    badge_stats.update_stats()
    
    # Progresso por programa
    program_stats = []
    for program in ['PROIND', 'PRODEPE', 'PRODEAUTO']:
        program_badges = UserBadge.objects.filter(
            user=request.user,
            badge_definition__program=program
        ).count()
        
        program_stats.append({
            'program': program,
            'badges_earned': program_badges,
            'total_possible': 12,  # 4 trilhas x 3 níveis
            'percentage': round((program_badges / 12) * 100, 1)
        })
    
    return Response({
        'overall_stats': {
            'total_badges': badge_stats.total_badges,
            'bronze_badges': badge_stats.bronze_badges,
            'silver_badges': badge_stats.silver_badges,
            'gold_badges': badge_stats.gold_badges,
            'completion_percentage': float(badge_stats.completion_percentage),
            'first_badge_earned': badge_stats.first_badge_earned,
            'last_badge_earned': badge_stats.last_badge_earned,
        },
        'program_stats': program_stats
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_certificate_test(request):
    """
    Registra o resultado de um teste de certificado
    """
    serializer = CertificateTestSubmissionSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    user = request.user
    
    try:
        with transaction.atomic():
            # Calcular estatísticas das respostas
            answers = data['answers']
            correct_answers = sum(1 for answer in answers if answer.get('is_correct', False))
            total_questions = len(answers)
            
            # Criar registro do teste
            certificate_test = CertificateTest.objects.create(
                user=user,
                program=data['program'],
                track=data['track'],
                score=data['score'],
                correct_answers=correct_answers,
                total_questions=total_questions,
                passed=data['passed'],
                answers=answers
            )
            
            return Response({
                'status': 'success',
                'message': 'Teste de certificado registrado com sucesso',
                'test_id': certificate_test.id,
                'score': float(certificate_test.score),
                'correct_answers': certificate_test.correct_answers,
                'total_questions': certificate_test.total_questions,
                'passed': certificate_test.passed
            }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({
            'error': 'Erro interno do servidor',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_certificates(request):
    """
    Retorna todos os certificados do usuário
    """
    user = request.user
    certificates = CertificateTest.objects.filter(user=user).order_by('-completed_at')
    
    certificates_data = []
    for cert in certificates:
        certificates_data.append({
            'id': cert.id,
            'program': cert.program,
            'track': cert.track,
            'score': float(cert.score),
            'correct_answers': cert.correct_answers,
            'total_questions': cert.total_questions,
            'passed': cert.passed,
            'completed_at': cert.completed_at,
            'status': 'Aprovado' if cert.passed else 'Reprovado'
        })
    
    return Response({
        'certificates': certificates_data,
        'total_certificates': len(certificates_data),
        'passed_certificates': len([c for c in certificates_data if c['passed']]),
        'failed_certificates': len([c for c in certificates_data if not c['passed']])
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_completed_certificates(request):
    """
    Retorna apenas os certificados aprovados (completados) pelo usuário
    """
    user = request.user
    print(f"🔍 Buscando certificados completados para usuário: {user.email}")
    print(f"🔍 Headers da requisição: {dict(request.headers)}")
    print(f"🔍 Authorization header: {request.headers.get('Authorization', 'Não encontrado')}")
    
    # Buscar todos os certificados do usuário (aprovados e reprovados)
    all_certificates = CertificateTest.objects.filter(user=user).order_by('-completed_at')
    print(f"🔍 Total de certificados do usuário: {all_certificates.count()}")
    
    for cert in all_certificates:
        print(f"🔍 Certificado: {cert.program}-{cert.track}, passed: {cert.passed}, score: {cert.score}")
    
    # Buscar apenas os aprovados
    completed_certificates = CertificateTest.objects.filter(
        user=user, 
        passed=True
    ).order_by('-completed_at')
    
    print(f"🔍 Certificados aprovados: {completed_certificates.count()}")
    
    completed_data = []
    for cert in completed_certificates:
        completed_data.append({
            'program': cert.program,
            'track': cert.track,
            'score': float(cert.score),
            'completed_at': cert.completed_at,
            'certificate_id': f"{cert.program}-{cert.track}"
        })
    
    print(f"🔍 Dados retornados: {completed_data}")
    
    return Response({
        'completed_certificates': completed_data,
        'total_completed': len(completed_data)
    })
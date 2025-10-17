from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
from django.db import transaction
from django.db import models

# Importar modelos primeiro
from .models import (
    TrailAccess, UserProgramProgress, UserOverallProgress,
    ChallengeCompletion, UserBadge, BadgeDefinition, UserCertificate, CertificateTest
)

# Verificar se os modelos foram importados corretamente
print(f"🔍 CertificateTest importado: {CertificateTest is not None}")
print(f"🔍 UserCertificate importado: {UserCertificate is not None}")

# Importar utilitários
try:
    from .certificate_utils import create_user_certificate_from_test
    print("✅ certificate_utils importado com sucesso")
except ImportError as e:
    print(f"❌ Erro ao importar certificate_utils: {e}")
    create_user_certificate_from_test = None
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
    """Registra o acesso do usuário a uma trilha"""
    serializer = TrackTrailAccessSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    data = serializer.validated_data
    user = request.user
    
    try:
        with transaction.atomic():
            trail_access, created = TrailAccess.objects.get_or_create(
                user=user,
                program=data['program'],
                trail_number=data['trail_number'],
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
                program_progress.save()
            
            UserOverallProgress.objects.get_or_create(user=user)
            
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
    """Retorna o progresso completo do usuário"""
    user = request.user
    
    program_progresses = UserProgramProgress.objects.filter(user=user)
    program_data = UserProgramProgressSerializer(program_progresses, many=True).data
    
    overall_progress, _ = UserOverallProgress.objects.get_or_create(user=user)
    overall_data = UserOverallProgressSerializer(overall_progress).data
    
    total_challenges = ChallengeCompletion.objects.filter(user=user).count()
    
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
    """Retorna progresso específico de um programa"""
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
            'next_trail': 1,
            'last_accessed_trail': 0,
            'total_access_count': 0
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_challenge(request):
    """Registra a conclusão de um desafio e concede badge se aplicável"""
    serializer_data = request.data
    user = request.user
    
    required_fields = ['program', 'trail_number', 'difficulty', 'score']
    if not all(field in serializer_data for field in required_fields):
        return Response({
            'error': 'Campos obrigatórios: program, trail_number, difficulty, score'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        with transaction.atomic():
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
            if created:
                try:
                    badge_def = BadgeDefinition.objects.get(
                        program=serializer_data['program'],
                        trail_number=serializer_data['trail_number'],
                        difficulty=serializer_data['difficulty'],
                        is_active=True
                    )
                    user_badge = UserBadge.objects.create(
                        user=user,
                        badge_definition=badge_def,
                        challenge_completion=completion
                    )
                    
                    badge_earned = {
                        'id': user_badge.id,
                        'name': badge_def.name,
                        'image_url': badge_def.badge_image_url,
                        'image_path': badge_def.badge_image,
                        'type': badge_def.badge_type,
                        'description': badge_def.description
                    }
                    
                except BadgeDefinition.DoesNotExist:
                    pass
            else:
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
    """Retorna todos os badges do usuário com URLs de imagem"""
    user_badges = UserBadge.objects.filter(user=request.user).select_related(
        'badge_definition', 'challenge_completion'
    ).order_by('-earned_at')
    
    badges_data = []
    for badge in user_badges:
        badges_data.append({
            'id': badge.id,
            'name': badge.badge_definition.name,
            'description': badge.badge_definition.description,
            'image_url': badge.badge_definition.badge_image_url,
            'image_path': badge.badge_definition.badge_image,
            'type': badge.badge_definition.badge_type,
            'program': badge.badge_definition.program,
            'trail_number': badge.badge_definition.trail_number,
            'difficulty': badge.badge_definition.difficulty,
            'earned_at': badge.earned_at,
            'score': float(badge.challenge_completion.score) if badge.challenge_completion.score else None,
        })
    
    total_badges = len(badges_data)
    bronze_badges = sum(1 for b in badges_data if b['type'] == 'BRONZE')
    silver_badges = sum(1 for b in badges_data if b['type'] == 'SILVER')
    gold_badges = sum(1 for b in badges_data if b['type'] == 'GOLD')
    
    proind_badges = sum(1 for b in badges_data if b['program'] == 'PROIND')
    prodepe_badges = sum(1 for b in badges_data if b['program'] == 'PRODEPE')
    prodeauto_badges = sum(1 for b in badges_data if b['program'] == 'PRODEAUTO')
    
    first_badge = badges_data[-1] if badges_data else None
    last_badge = badges_data[0] if badges_data else None
    
    return Response({
        'badges': badges_data,
        'stats': {
            'total_badges': total_badges,
            'bronze_badges': bronze_badges,
            'silver_badges': silver_badges,
            'gold_badges': gold_badges,
            'completion_percentage': round((total_badges / 36) * 100, 2),
            'proind_badges': proind_badges,
            'prodepe_badges': prodepe_badges,
            'prodeauto_badges': prodeauto_badges,
            'first_badge_earned': first_badge['earned_at'] if first_badge else None,
            'last_badge_earned': last_badge['earned_at'] if last_badge else None,
        }
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_badge_stats(request):
    """Retorna estatísticas detalhadas de badges do usuário"""
    user_badges = UserBadge.objects.filter(user=request.user).select_related('badge_definition')
    total_badges = user_badges.count()
    bronze_badges = user_badges.filter(badge_definition__badge_type='BRONZE').count()
    silver_badges = user_badges.filter(badge_definition__badge_type='SILVER').count()
    gold_badges = user_badges.filter(badge_definition__badge_type='GOLD').count()
    
    program_stats = []
    for program in ['PROIND', 'PRODEPE', 'PRODEAUTO']:
        program_badges = user_badges.filter(badge_definition__program=program).count()
        
        program_stats.append({
            'program': program,
            'badges_earned': program_badges,
            'total_possible': 12,
            'percentage': round((program_badges / 12) * 100, 1)
        })
    
    first_badge = user_badges.order_by('earned_at').first()
    last_badge = user_badges.order_by('-earned_at').first()
    
    return Response({
        'overall_stats': {
            'total_badges': total_badges,
            'bronze_badges': bronze_badges,
            'silver_badges': silver_badges,
            'gold_badges': gold_badges,
            'completion_percentage': round((total_badges / 36) * 100, 2),
            'first_badge_earned': first_badge.earned_at if first_badge else None,
            'last_badge_earned': last_badge.earned_at if last_badge else None,
        },
        'program_stats': program_stats
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_certificate_test(request):
    """
    Registra o resultado de um teste de certificado
    """
    print(f"🔍 Recebendo dados do teste: {request.data}")
    print(f"🔍 Usuário: {request.user.email}")
    
    try:
        serializer = CertificateTestSubmissionSerializer(data=request.data)
        if not serializer.is_valid():
            print(f"❌ Erro de validação: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(f"❌ Erro ao criar serializer: {e}")
        return Response({
            'error': 'Erro ao processar dados do teste',
            'message': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    data = serializer.validated_data
    user = request.user
    
    print(f"✅ Dados validados: {data}")
    
    try:
        with transaction.atomic():
            # Calcular estatísticas das respostas
            answers = data['answers']
            correct_answers = sum(1 for answer in answers if answer.get('is_correct', False))
            total_questions = len(answers)
            
            print(f"🔍 Estatísticas: {correct_answers}/{total_questions} corretas")
            
            # Verificar se CertificateTest está disponível
            print(f"🔍 CertificateTest disponível: {CertificateTest is not None}")
            print(f"🔍 Tipo de CertificateTest: {type(CertificateTest)}")
            
            # Criar registro do teste
            try:
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
                print(f"✅ Teste criado com ID: {certificate_test.id}")
            except Exception as create_error:
                print(f"❌ Erro ao criar CertificateTest: {create_error}")
                import traceback
                traceback.print_exc()
                raise create_error
            
            # Se o usuário passou no teste, criar certificação persistente
            user_certificate = None
            if certificate_test.passed and create_user_certificate_from_test:
                try:
                    print("🔍 Criando certificação persistente...")
                    user_certificate = create_user_certificate_from_test(certificate_test)
                    print(f"✅ Certificação persistente criada: {user_certificate.certificate_id}")
                except Exception as e:
                    # Log do erro mas não falha o processo
                    print(f"❌ Erro ao criar certificação persistente: {e}")
            elif certificate_test.passed and not create_user_certificate_from_test:
                print("⚠️ Função create_user_certificate_from_test não disponível")
            
            response_data = {
                'status': 'success',
                'message': 'Teste de certificado registrado com sucesso',
                'test_id': certificate_test.id,
                'score': float(certificate_test.score),
                'correct_answers': certificate_test.correct_answers,
                'total_questions': certificate_test.total_questions,
                'passed': certificate_test.passed
            }
            
            # Adicionar informações da certificação se foi criada
            if user_certificate:
                response_data['certificate_created'] = True
                response_data['certificate_id'] = user_certificate.certificate_id
                response_data['certificate_name'] = user_certificate.certificate_name
            else:
                response_data['certificate_created'] = False
            
            print(f"✅ Resposta enviada: {response_data}")
            return Response(response_data, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        print(f"❌ Erro interno: {e}")
        import traceback
        traceback.print_exc()
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_certificates_persistent(request):
    """
    Retorna as certificações persistentes do usuário (independente da existência dos testes)
    """
    user = request.user
    
    # Buscar certificações persistentes
    user_certificates = UserCertificate.objects.filter(
        user=user,
        is_active=True,
        is_verified=True
    ).order_by('-earned_at')
    
    certificates_data = []
    for cert in user_certificates:
        certificates_data.append({
            'id': cert.certificate_id,
            'program': cert.program,
            'track': cert.track,
            'certificate_name': cert.certificate_name,
            'certificate_description': cert.certificate_description,
            'score': float(cert.score),
            'correct_answers': cert.correct_answers,
            'total_questions': cert.total_questions,
            'earned_at': cert.earned_at,
            'expires_at': cert.expires_at,
            'status': cert.status_display,
            'certificate_url': cert.certificate_url,
            'is_expired': cert.is_expired
        })
    
    # Estatísticas
    total_certificates = len(certificates_data)
    active_certificates = len([c for c in certificates_data if not c['is_expired']])
    expired_certificates = len([c for c in certificates_data if c['is_expired']])
    
    # Agrupar por programa
    by_program = {}
    for cert in certificates_data:
        program = cert['program']
        if program not in by_program:
            by_program[program] = []
        by_program[program].append(cert)
    
    return Response({
        'certificates': certificates_data,
        'total_certificates': total_certificates,
        'active_certificates': active_certificates,
        'expired_certificates': expired_certificates,
        'by_program': by_program
    })
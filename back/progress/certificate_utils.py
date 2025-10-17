"""
Utilitários para gerenciamento de certificações de usuários
"""
import uuid
from datetime import datetime, timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model
from .models import UserCertificate, CertificateTest

User = get_user_model()

def generate_certificate_id(program: str, track: str, user_id: int) -> str:
    """
    Gera um ID único para a certificação
    Formato: {PROGRAM}-{TRACK}-{USER_ID}-{TIMESTAMP}
    """
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    track_clean = track.lower().replace(' ', '-').replace('_', '-')
    return f"{program.upper()}-{track_clean}-{user_id}-{timestamp}"

def create_user_certificate_from_test(certificate_test: CertificateTest) -> UserCertificate:
    """
    Cria uma certificação persistente a partir de um teste de certificado aprovado
    """
    if not certificate_test.passed:
        raise ValueError("Não é possível criar certificação para teste reprovado")
    
    # Gera ID único da certificação
    certificate_id = generate_certificate_id(
        certificate_test.program, 
        certificate_test.track, 
        certificate_test.user.id
    )
    
    # Nome da certificação
    certificate_name = f"Certificação {certificate_test.program} - {certificate_test.track}"
    
    # Descrição da certificação
    certificate_description = (
        f"Certificação obtida através do teste de {certificate_test.track} "
        f"do programa {certificate_test.program}. "
        f"Pontuação: {certificate_test.score}% "
        f"({certificate_test.correct_answers}/{certificate_test.total_questions} acertos)."
    )
    
    # Cria ou atualiza a certificação do usuário
    user_certificate, created = UserCertificate.objects.get_or_create(
        user=certificate_test.user,
        program=certificate_test.program,
        track=certificate_test.track,
        defaults={
            'certificate_id': certificate_id,
            'certificate_name': certificate_name,
            'certificate_description': certificate_description,
            'score': certificate_test.score,
            'correct_answers': certificate_test.correct_answers,
            'total_questions': certificate_test.total_questions,
            'answers': certificate_test.answers,
            'is_active': True,
            'is_verified': True,
        }
    )
    
    # Se já existia, atualiza com os dados mais recentes
    if not created:
        user_certificate.certificate_id = certificate_id
        user_certificate.certificate_name = certificate_name
        user_certificate.certificate_description = certificate_description
        user_certificate.score = certificate_test.score
        user_certificate.correct_answers = certificate_test.correct_answers
        user_certificate.total_questions = certificate_test.total_questions
        user_certificate.answers = certificate_test.answers
        user_certificate.earned_at = certificate_test.completed_at
        user_certificate.is_active = True
        user_certificate.is_verified = True
        user_certificate.save()
    
    return user_certificate

def get_user_certificates(user, program=None, track=None, active_only=True):
    """
    Retorna as certificações de um usuário
    """
    queryset = UserCertificate.objects.filter(user=user)
    
    if program:
        queryset = queryset.filter(program=program)
    
    if track:
        queryset = queryset.filter(track=track)
    
    if active_only:
        queryset = queryset.filter(is_active=True, is_verified=True)
    
    return queryset.order_by('-earned_at')

def has_user_certificate(user, program, track):
    """
    Verifica se o usuário já possui certificação para um programa/trilha específico
    """
    return UserCertificate.objects.filter(
        user=user,
        program=program,
        track=track,
        is_active=True,
        is_verified=True
    ).exists()

def revoke_user_certificate(user, program, track, reason="Certificação revogada"):
    """
    Revoga uma certificação do usuário
    """
    try:
        certificate = UserCertificate.objects.get(
            user=user,
            program=program,
            track=track
        )
        certificate.is_active = False
        certificate.certificate_description += f"\n\nRevogada em {timezone.now()}: {reason}"
        certificate.save()
        return True
    except UserCertificate.DoesNotExist:
        return False

def get_certificate_stats(user):
    """
    Retorna estatísticas das certificações do usuário
    """
    certificates = get_user_certificates(user)
    
    stats = {
        'total_certificates': certificates.count(),
        'by_program': {},
        'average_score': 0,
        'recent_certificates': certificates[:5],
    }
    
    # Estatísticas por programa
    for program in ['PROIND', 'PRODEPE', 'PRODEAUTO']:
        program_certs = certificates.filter(program=program)
        stats['by_program'][program] = {
            'count': program_certs.count(),
            'certificates': program_certs
        }
    
    # Score médio
    if certificates.exists():
        stats['average_score'] = round(
            sum(cert.score for cert in certificates) / certificates.count(), 2
        )
    
    return stats

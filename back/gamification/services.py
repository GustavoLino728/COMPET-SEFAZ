from django.db import transaction
from django.contrib.auth import get_user_model
from .models import Trail, UserTrailProgress, BadgeType, UserBadge, UserStats, Program, Certificate, UserCertificate

User = get_user_model()

class ProgressService:
    """Serviço para trilhas e badges (sem certificados)"""
    
    @staticmethod
    def record_trail_completion_by_url(user, current_url):
        """Registra conclusão da trilha baseado na URL"""
        try:
            clean_url = current_url.split('?')[0].split('#')[0]
            trail = Trail.objects.get(page_url=clean_url, is_active=True)
            
            progress, created = UserTrailProgress.objects.get_or_create(
                user=user,
                trail=trail
            )
            
            first_completion = progress.mark_as_completed()
            
            # Atualiza estatísticas
            stats, _ = UserStats.objects.get_or_create(user=user)
            stats.update_stats()
            
            return {
                'progress': progress,
                'first_completion': first_completion,
                'trail': trail
            }
            
        except Trail.DoesNotExist:
            return None
    
    @staticmethod 
    def record_trail_completion_by_slug(user, trail_slug):
        """Alternativo: Registra conclusão por slug"""
        try:
            trail = Trail.objects.get(slug=trail_slug, is_active=True)
            progress, created = UserTrailProgress.objects.get_or_create(
                user=user,
                trail=trail
            )
            
            first_completion = progress.mark_as_completed()
            
            stats, _ = UserStats.objects.get_or_create(user=user)
            stats.update_stats()
            
            return {
                'progress': progress,
                'first_completion': first_completion,
                'trail': trail
            }
            
        except Trail.DoesNotExist:
            raise ValueError(f"Trilha '{trail_slug}' não encontrada")
    
    @staticmethod
    def get_user_recommendations(user, limit=3):
        """Retorna trilhas recomendadas baseadas no progresso"""
        # Pega trilhas já acessadas
        accessed_trails = user.trail_progress.values_list('trail_id', flat=True)
        
        # Pega áreas de interesse do usuário
        user_interest = getattr(user, 'interest_area', None)
        
        # Lógica de recomendação
        recommendations = Trail.objects.filter(is_active=True).exclude(id__in=accessed_trails)
        
        # Prioriza por área de interesse se disponível
        if user_interest:
            interest_trails = recommendations.filter(
                program__name__icontains=user_interest
            )[:limit//2]
            
            other_trails = recommendations.exclude(
                program__name__icontains=user_interest
            )[:limit - len(interest_trails)]
            
            return list(interest_trails) + list(other_trails)
        
        # Senão, recomenda por ordem de dificuldade
        return recommendations.order_by('difficulty_level', 'order')[:limit]

class BadgeService:
    """Serviço apenas para badges"""
    
    @staticmethod
    def check_and_award_badges(user):
        """Verifica e concede badges - SEM certificados"""
        stats, _ = UserStats.objects.get_or_create(user=user)
        stats.update_stats()
        
        awarded_badges = []
        awarded_badges.extend(BadgeService._check_completion_badges(user, stats))
        awarded_badges.extend(BadgeService._check_program_badges(user, stats))
        awarded_badges.extend(BadgeService._check_special_badges(user, stats))
        
        return awarded_badges
    
    @staticmethod
    def _check_completion_badges(user, stats):
        """Badges baseados em trilhas concluídas"""
        awarded = []
        
        # Primeira trilha
        if stats.trilhas_concluidas >= 1:
            badge_type, _ = BadgeType.objects.get_or_create(
                slug='primeira-trilha',
                defaults={
                    'name': 'Primeiro Passo',
                    'description': 'Concluiu sua primeira trilha',
                    'category': 'PROGRESS',
                    'image': 'badges/primeira_trilha.png'
                }
            )
            badge, created = UserBadge.objects.get_or_create(user=user, badge_type=badge_type)
            if created: awarded.append(badge)
        
        # DESBRAVADOR - 5 trilhas
        if stats.trilhas_concluidas >= 5:
            badge_type, _ = BadgeType.objects.get_or_create(
                slug='desbravador',
                defaults={
                    'name': 'DESBRAVADOR',
                    'description': 'Concluiu 5 trilhas',
                    'category': 'EXPLORATION',
                    'image': 'badges/desbravador.png',
                    'required_trails_count': 5
                }
            )
            badge, created = UserBadge.objects.get_or_create(
                user=user, 
                badge_type=badge_type,
                defaults={'progress_count': stats.trilhas_concluidas}
            )
            if not created:
                badge.progress_count = stats.trilhas_concluidas
                badge.save()
            if created: awarded.append(badge)
        
        return awarded
    
    @staticmethod
    def _check_program_badges(user, stats):
        """Badges por programa"""
        awarded = []
        
        for program in Program.objects.all():
            program_trails = Trail.objects.filter(program=program, is_active=True)
            completed_in_program = user.trail_progress.filter(
                trail__in=program_trails,
                status='COMPLETED'
            ).count()
            
            if completed_in_program == program_trails.count():
                badge_type, _ = BadgeType.objects.get_or_create(
                    slug=f'master-{program.name.lower()}',
                    defaults={
                        'name': f'Master {program.name}',
                        'description': f'Concluiu todas as trilhas do {program.display_name}',
                        'category': 'COMPLETION',
                        'image': f'badges/master_{program.name.lower()}.png',
                        'specific_program': program
                    }
                )
                badge, created = UserBadge.objects.get_or_create(user=user, badge_type=badge_type)
                if created: awarded.append(badge)
        
        return awarded
    
    @staticmethod
    def _check_special_badges(user, stats):
        """Badges especiais"""
        awarded = []
        
        total_trails = Trail.objects.filter(is_active=True).count()
        if stats.trilhas_concluidas >= total_trails:
            badge_type, _ = BadgeType.objects.get_or_create(
                slug='master-completo',
                defaults={
                    'name': 'Master Completo',
                    'description': 'Concluiu todas as trilhas disponíveis',
                    'category': 'SPECIAL',
                    'image': 'badges/master_completo.png'
                }
            )
            badge, created = UserBadge.objects.get_or_create(user=user, badge_type=badge_type)
            if created: awarded.append(badge)
        
        return awarded

class CertificateService:
    """Serviço para gestão manual de certificados"""
    
    @staticmethod
    def award_certificate_to_user(certificate_id, user_id, issued_by_user, notes=""):
        """Concede certificado manualmente a um usuário"""
        try:
            certificate = Certificate.objects.get(id=certificate_id, is_active=True)
            user = User.objects.get(id=user_id)
            
            user_certificate, created = UserCertificate.objects.get_or_create(
                user=user,
                certificate=certificate,
                defaults={
                    'issued_by': issued_by_user,
                    'notes': notes
                }
            )
            
            if created:
                # Atualizar stats
                stats, _ = UserStats.objects.get_or_create(user=user)
                stats.update_stats()
                
                return user_certificate
            else:
                return None  # Já possuía o certificado
                
        except (Certificate.DoesNotExist, User.DoesNotExist):
            raise ValueError("Certificado ou usuário não encontrado")

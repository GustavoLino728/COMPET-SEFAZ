from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
import os

User = get_user_model()

class DifficultyLevel(models.TextChoices):
    EASY = 'EASY', 'Fácil'
    MEDIUM = 'MEDIUM', 'Médio'
    HARD = 'HARD', 'Difícil'

class BadgeType(models.TextChoices):
    BRONZE = 'BRONZE', 'Bronze'
    SILVER = 'SILVER', 'Prata'
    GOLD = 'GOLD', 'Ouro'

# Funções auxiliares (movidas para cima)
def get_trail_name(trail_number):
    """Mapear número da trilha para nome descritivo"""
    trail_names = {
        1: "Cálculo do Incentivo",
        2: "Lançamentos do Incentivo", 
        3: "Controles Suplementares",
        4: "Concessão do Incentivo"
    }
    return trail_names.get(trail_number, f"T{trail_number}")

def get_difficulty_text(difficulty):
    """Converter dificuldade para texto em português"""
    return dict(DifficultyLevel.choices).get(difficulty, difficulty)

def generate_standardized_badge_name(program, trail_number, difficulty):
    """Gerar nome padronizado da badge"""
    trail_name = get_trail_name(trail_number)
    difficulty_text = get_difficulty_text(difficulty)
    return f"{program} - {trail_name} - {difficulty_text}"

class TrailAccess(models.Model):
    """Registra acessos dos usuários às trilhas"""
    PROGRAMS = [
        ('PROIND', 'PROIND'),
        ('PRODEPE', 'PRODEPE'), 
        ('PRODEAUTO', 'PRODEAUTO'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trail_accesses')
    program = models.CharField(max_length=10, choices=PROGRAMS)
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    
    first_access = models.DateTimeField(auto_now_add=True)
    last_access = models.DateTimeField(auto_now=True)
    access_count = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ['user', 'program', 'trail_number']  # Simplificado
        indexes = [
            models.Index(fields=['user', 'program']),
            models.Index(fields=['user', 'last_access']),
        ]
        verbose_name = 'Acesso à Trilha'
        verbose_name_plural = 'Acessos às Trilhas'
    
    @property
    def trail_id(self):
        """Gerar ID da trilha dinamicamente"""
        trail_slug = get_trail_name(self.trail_number).lower().replace(' ', '-')
        return f"{self.program.lower()}-{trail_slug}"
    
    def __str__(self):
        return f"{self.user.email} - {self.program} T{self.trail_number} ({self.access_count}x)"

class UserProgramProgress(models.Model):
    """Mantém o progresso consolidado do usuário por programa"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='program_progress')
    program = models.CharField(max_length=10, choices=TrailAccess.PROGRAMS)
    
    # Apenas o essencial
    trails_accessed = models.JSONField(default=list)  # [1, 2, 3, 4]
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'program']
        verbose_name = 'Progresso do Programa'
        verbose_name_plural = 'Progressos dos Programas'
        ordering = ['user', 'program']
    
    def __str__(self):
        return f"{self.user.email} - {self.program} ({len(self.trails_accessed)}/4)"
    
    @property
    def progress_percentage(self):
        return round((len(self.trails_accessed) / 4) * 100, 1)
    
    @property
    def is_completed(self):
        return len(self.trails_accessed) == 4
    
    @property
    def last_accessed_trail(self):
        """Calculado dinamicamente"""
        return max(self.trails_accessed) if self.trails_accessed else 0
    
    @property
    def total_access_count(self):
        """Calculado dinamicamente"""
        return self.user.trail_accesses.filter(program=self.program).aggregate(
            total=models.Sum('access_count')
        )['total'] or 0
    
    @property
    def next_trail(self):
        if self.is_completed:
            return None
        for trail_num in range(1, 5):
            if trail_num not in self.trails_accessed:
                return trail_num
        return None

# Simplificar UserOverallProgress - fazer tudo @property
class UserOverallProgress(models.Model):
    """Progresso geral do usuário - apenas timestamps"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='overall_progress')
    
    # Apenas timestamps essenciais
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Progresso Geral'
        verbose_name_plural = 'Progressos Gerais'
    
    def __str__(self):
        return f"{self.user.email} - {self.total_trails_accessed} trilhas"
    
    @property
    def total_trails_accessed(self):
        """Calculado dinamicamente"""
        return sum(len(p.trails_accessed) for p in self.user.program_progress.all())
    
    @property
    def total_access_count(self):
        return sum(p.total_access_count for p in self.user.program_progress.all())
    
    @property
    def programs_started(self):
        return [p.program for p in self.user.program_progress.all() if len(p.trails_accessed) > 0]
    
    @property
    def programs_completed(self):
        return [p.program for p in self.user.program_progress.all() if p.is_completed]
    
    @property
    def overall_percentage(self):
        return round((self.total_trails_accessed / 12) * 100, 1)

class BadgeDefinition(models.Model):
    """Define os badges disponíveis no sistema"""
    PROGRAMS = TrailAccess.PROGRAMS
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    program = models.CharField(max_length=10, choices=PROGRAMS)
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    difficulty = models.CharField(max_length=10, choices=DifficultyLevel.choices)
    badge_type = models.CharField(max_length=10, choices=BadgeType.choices)
    badge_image = models.CharField(max_length=255, default='badges/default.png') 
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['program', 'trail_number', 'difficulty']
        verbose_name = 'Definição de Badge'
        verbose_name_plural = 'Definições de Badges'
    
    def __str__(self):
        return generate_standardized_badge_name(self.program, self.trail_number, self.difficulty)
        
    def save(self, *args, **kwargs):
        self.name = generate_standardized_badge_name(self.program, self.trail_number, self.difficulty)
        super().save(*args, **kwargs)
    
    @property
    def badge_image_url(self):
        """Retorna URL completa da imagem do badge"""
        base_url = "http://localhost:8000" if settings.DEBUG else "https://prod.com"
        
        full_path = os.path.join(settings.MEDIA_ROOT, self.badge_image)
        if os.path.exists(full_path):
            return f"{base_url}{settings.MEDIA_URL}{self.badge_image}"
        else:
            return f"{base_url}{settings.MEDIA_URL}badges/default.jpg"

class ChallengeCompletion(models.Model):
    """Registra a conclusão de desafios pelos usuários"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='challenge_completions')
    program = models.CharField(max_length=10, choices=TrailAccess.PROGRAMS)
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    difficulty = models.CharField(max_length=10, choices=DifficultyLevel.choices)
    
    challenge_id = models.PositiveIntegerField(null=True, blank=True)
    completed_at = models.DateTimeField(auto_now_add=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    attempts = models.PositiveIntegerField(default=1)
    completion_time_seconds = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'program', 'trail_number', 'difficulty']
        verbose_name = 'Conclusão de Desafio'
        verbose_name_plural = 'Conclusões de Desafios'
    
    def __str__(self):
        return f"{self.user.email} - {generate_standardized_badge_name(self.program, self.trail_number, self.difficulty)}"

class UserBadge(models.Model):
    """Badges conquistados pelos usuários"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    badge_definition = models.ForeignKey(BadgeDefinition, on_delete=models.CASCADE)
    challenge_completion = models.OneToOneField(ChallengeCompletion, on_delete=models.CASCADE, related_name='badge_earned')
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'badge_definition']
        verbose_name = 'Badge do Usuário'
        verbose_name_plural = 'Badges dos Usuários'
    
    def __str__(self):
        return f"{self.user.email} - {self.badge_definition.name}"

class CertificateTest(models.Model):
    """Registra testes de certificado realizados pelos usuários"""
    PROGRAMS = [
        ('PROIND', 'PROIND'),
        ('PRODEPE', 'PRODEPE'), 
        ('PRODEAUTO', 'PRODEAUTO'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificate_tests')
    program = models.CharField(max_length=10, choices=PROGRAMS)
    track = models.CharField(max_length=100)  # Nome da trilha
    
    # Resultados do teste
    score = models.DecimalField(max_digits=5, decimal_places=2)  # 0-100
    correct_answers = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    passed = models.BooleanField()  # True se acertou 4 ou mais de 5
    
    # Dados das respostas
    answers = models.JSONField()  # Lista de respostas do usuário
    
    # Timestamps
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['user', 'completed_at']),
            models.Index(fields=['program', 'track']),
            models.Index(fields=['passed']),
        ]
        verbose_name = 'Teste de Certificado'
        verbose_name_plural = 'Testes de Certificados'
    
    def __str__(self):
        status = "Aprovado" if self.passed else "Reprovado"
        return f"{self.user.email} - {self.program} {self.track} ({status})"

class UserCertificate(models.Model):
    """Certificações conquistadas pelos usuários - persiste independentemente dos testes"""
    PROGRAMS = [
        ('PROIND', 'PROIND'),
        ('PRODEPE', 'PRODEPE'), 
        ('PRODEAUTO', 'PRODEAUTO'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_certificates')
    program = models.CharField(max_length=10, choices=PROGRAMS)
    track = models.CharField(max_length=100)  # Nome da trilha
    
    # Dados da certificação
    certificate_id = models.CharField(max_length=50, unique=True)  # ID único da certificação
    certificate_name = models.CharField(max_length=200)  # Nome da certificação
    certificate_description = models.TextField(blank=True, null=True)
    
    # Resultados do teste que gerou a certificação
    score = models.DecimalField(max_digits=5, decimal_places=2)  # 0-100
    correct_answers = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()
    
    # Dados das respostas (para possível revalidação)
    answers = models.JSONField(default=list, blank=True)
    
    # Timestamps
    earned_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)  # Opcional: data de expiração
    
    # Status da certificação
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=True)  # Se foi verificada pelo sistema
    
    class Meta:
        unique_together = ['user', 'program', 'track']  # Um usuário só pode ter uma cert por programa/trilha
        indexes = [
            models.Index(fields=['user', 'earned_at']),
            models.Index(fields=['program', 'track']),
            models.Index(fields=['certificate_id']),
            models.Index(fields=['is_active', 'is_verified']),
        ]
        verbose_name = 'Certificação do Usuário'
        verbose_name_plural = 'Certificações dos Usuários'
        ordering = ['-earned_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.program} {self.track} ({self.score}%)"
    
    @property
    def certificate_url(self):
        """URL para download/visualização do certificado"""
        return f"/certificates/{self.certificate_id}/download/"
    
    @property
    def is_expired(self):
        """Verifica se a certificação expirou"""
        if not self.expires_at:
            return False
        return timezone.now() > self.expires_at
    
    @property
    def status_display(self):
        """Status legível da certificação"""
        if not self.is_active:
            return "Inativa"
        if self.is_expired:
            return "Expirada"
        if not self.is_verified:
            return "Pendente de Verificação"
        return "Ativa"
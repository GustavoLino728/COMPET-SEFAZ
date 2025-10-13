from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

# Enum choices para níveis de dificuldade
class DifficultyLevel(models.TextChoices):
    EASY = 'EASY', 'Fácil'
    MEDIUM = 'MEDIUM', 'Médio'
    HARD = 'HARD', 'Difícil'

# Enum choices para tipos de badge
class BadgeType(models.TextChoices):
    BRONZE = 'BRONZE', 'Bronze'
    SILVER = 'SILVER', 'Prata'
    GOLD = 'GOLD', 'Ouro'

class TrailAccess(models.Model):
    """Registra acessos dos usuários às trilhas"""
    PROGRAMS = [
        ('PROIND', 'PROIND'),
        ('PRODEPE', 'PRODEPE'), 
        ('PRODEAUTO', 'PRODEAUTO'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trail_accesses')
    program = models.CharField(max_length=10, choices=PROGRAMS)
    trail_id = models.CharField(max_length=100)  # Ex: 'proind-calculo-incentivo'
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    
    # Tracking temporal
    first_access = models.DateTimeField(auto_now_add=True)
    last_access = models.DateTimeField(auto_now=True)
    access_count = models.PositiveIntegerField(default=1)
    
    class Meta:
        unique_together = ['user', 'trail_id']
        indexes = [
            models.Index(fields=['user', 'program']),
            models.Index(fields=['user', 'trail_id']),
            models.Index(fields=['user', 'last_access']),  # Para ordenações
        ]
        verbose_name = 'Acesso à Trilha'
        verbose_name_plural = 'Acessos às Trilhas'
    
    def __str__(self):
        return f"{self.user.email} - {self.trail_id} ({self.access_count}x)"

class UserProgramProgress(models.Model):
    """Mantém o progresso consolidado do usuário por programa"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='program_progress')
    program = models.CharField(max_length=10, choices=TrailAccess.PROGRAMS)
    
    # Progresso
    last_accessed_trail = models.IntegerField(default=0)  # Última trilha acessada (1-4)
    trails_accessed = models.JSONField(default=list)  # [1, 2, 3, 4] - trilhas já acessadas
    total_access_count = models.PositiveIntegerField(default=0)  # Total de acessos no programa
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        unique_together = ['user', 'program']
        indexes = [
            models.Index(fields=['user', 'program']),
            models.Index(fields=['user', 'updated_at']),
        ]
        verbose_name = 'Progresso do Programa'
        verbose_name_plural = 'Progressos dos Programas'
        ordering = ['user', 'program']
    
    def __str__(self):
        return f"{self.user.email} - {self.program} ({len(self.trails_accessed)}/4)"
    
    @property
    def progress_percentage(self):
        """Calcula percentual de progresso (0-100%)"""
        return round((len(self.trails_accessed) / 4) * 100, 1)
    
    @property
    def is_completed(self):
        """Verifica se completou todas as 4 trilhas do programa"""
        return len(self.trails_accessed) == 4
    
    @property
    def next_trail(self):
        """Retorna o número da próxima trilha a ser acessada"""
        if self.is_completed:
            return None
        
        for trail_num in range(1, 5):
            if trail_num not in self.trails_accessed:
                return trail_num
        return None

class UserOverallProgress(models.Model):
    """Progresso geral do usuário em todos os programas"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='overall_progress')
    
    # Estatísticas gerais
    total_trails_accessed = models.PositiveIntegerField(default=0)
    total_access_count = models.PositiveIntegerField(default=0)
    programs_started = models.JSONField(default=list)  # ['PROIND', 'PRODEPE']
    programs_completed = models.JSONField(default=list)  # ['PROIND']
    
    # Timestamps
    first_access = models.DateTimeField(null=True, blank=True)
    last_access = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Progresso Geral'
        verbose_name_plural = 'Progressos Gerais'
    
    def __str__(self):
        return f"{self.user.email} - {self.total_trails_accessed} trilhas"
    
    @property
    def overall_percentage(self):
        """Percentual geral considerando todos os programas (12 trilhas total)"""
        return round((self.total_trails_accessed / 12) * 100, 1)
    
    def update_stats(self):
        """Atualiza as estatísticas baseado nos progressos dos programas"""
        program_progresses = self.user.program_progress.all()
        
        # Resetar contadores
        self.total_trails_accessed = 0
        self.total_access_count = 0
        self.programs_started = []
        self.programs_completed = []
        
        for progress in program_progresses:
            self.total_trails_accessed += len(progress.trails_accessed)
            self.total_access_count += progress.total_access_count
            
            if len(progress.trails_accessed) > 0:
                self.programs_started.append(progress.program)
            
            if progress.is_completed:
                self.programs_completed.append(progress.program)
        
        # Atualizar timestamps
        first_access = TrailAccess.objects.filter(user=self.user).order_by('first_access').first()
        last_access = TrailAccess.objects.filter(user=self.user).order_by('-last_access').first()
        
        if first_access:
            self.first_access = first_access.first_access
        if last_access:
            self.last_access = last_access.last_access
        
        self.save()

class BadgeDefinition(models.Model):
    """Define os badges disponíveis no sistema"""
    PROGRAMS = [
        ('PROIND', 'PROIND'),
        ('PRODEPE', 'PRODEPE'), 
        ('PRODEAUTO', 'PRODEAUTO'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    program = models.CharField(max_length=10, choices=PROGRAMS)
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    difficulty = models.CharField(max_length=10, choices=DifficultyLevel.choices)
    badge_type = models.CharField(max_length=10, choices=BadgeType.choices)
    
    # Campo para imagem ao invés de emoji
    badge_image = models.CharField(max_length=255, default='badges/default.png')  # Caminho da imagem
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['program', 'trail_number', 'difficulty']
        indexes = [
            models.Index(fields=['program', 'trail_number']),
            models.Index(fields=['difficulty', 'badge_type']),
        ]
        verbose_name = 'Definição de Badge'
        verbose_name_plural = 'Definições de Badges'
    
    def __str__(self):
        return f"{self.program} T{self.trail_number} - {self.get_difficulty_display()} ({self.badge_type})"
    
    @property
    def badge_image_url(self):
        """Retorna URL completa da imagem do badge"""
        from django.conf import settings
        import os
        
        full_path = os.path.join(settings.MEDIA_ROOT, self.badge_image)
        
        if settings.DEBUG:
            base_url = "http://localhost:8000"
        else:
            base_url = "https://prod.com"
        
        if os.path.exists(full_path):
            return f"{base_url}{settings.MEDIA_URL}{self.badge_image}"
        else:
            # Fallback para imagem padrão
            return f"{base_url}{settings.MEDIA_URL}badges/default.jpg"
    
    @property  
    def badge_image_path(self):
        """Retorna caminho da imagem baseado no tipo e programa"""
        # Estrutura: badges/{program}_{trail}_{difficulty}.png
        # Ex: badges/proind_t1_bronze.png, badges/prodepe_t2_silver.png
        filename = f"{self.program.lower()}_t{self.trail_number}_{self.badge_type.lower()}.png"
        return f"badges/{filename}"

class ChallengeCompletion(models.Model):
    """Registra a conclusão de desafios pelos usuários"""
    PROGRAMS = BadgeDefinition.PROGRAMS
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='challenge_completions')
    program = models.CharField(max_length=10, choices=PROGRAMS)
    trail_number = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    difficulty = models.CharField(max_length=10, choices=DifficultyLevel.choices)
    
    # Referência ao desafio do sistema existente (se necessário)
    challenge_id = models.PositiveIntegerField(null=True, blank=True)
    
    # Dados da conclusão
    completed_at = models.DateTimeField(auto_now_add=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)  # 0-100
    attempts = models.PositiveIntegerField(default=1)
    
    # Metadados
    completion_time_seconds = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'program', 'trail_number', 'difficulty']
        indexes = [
            models.Index(fields=['user', 'completed_at']),
            models.Index(fields=['program', 'trail_number', 'difficulty']),
        ]
        verbose_name = 'Conclusão de Desafio'
        verbose_name_plural = 'Conclusões de Desafios'
    
    def __str__(self):
        return f"{self.user.email} - {self.program} T{self.trail_number} {self.get_difficulty_display()}"

class UserBadge(models.Model):
    """Badges conquistados pelos usuários"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    badge_definition = models.ForeignKey(BadgeDefinition, on_delete=models.CASCADE)
    challenge_completion = models.OneToOneField(
        ChallengeCompletion, 
        on_delete=models.CASCADE,
        related_name='badge_earned'
    )
    
    earned_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['user', 'badge_definition']
        indexes = [
            models.Index(fields=['user', 'earned_at']),
            models.Index(fields=['badge_definition']),
        ]
        verbose_name = 'Badge do Usuário'
        verbose_name_plural = 'Badges dos Usuários'
    
    def __str__(self):
        return f"{self.user.email} - {self.badge_definition.name}"

class UserBadgeStats(models.Model):
    """Estatísticas consolidadas de badges do usuário"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='badge_stats')
    
    # Contadores por tipo
    bronze_badges = models.PositiveIntegerField(default=0)
    silver_badges = models.PositiveIntegerField(default=0)
    gold_badges = models.PositiveIntegerField(default=0)
    total_badges = models.PositiveIntegerField(default=0)
    
    # Contadores por programa
    proind_badges = models.PositiveIntegerField(default=0)
    prodepe_badges = models.PositiveIntegerField(default=0)
    prodeauto_badges = models.PositiveIntegerField(default=0)
    
    # Progresso geral
    completion_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)  # 0-100%
    
    # Timestamps
    first_badge_earned = models.DateTimeField(null=True, blank=True)
    last_badge_earned = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Estatísticas de Badges'
        verbose_name_plural = 'Estatísticas de Badges'
    
    def __str__(self):
        return f"{self.user.email} - {self.total_badges}/36 badges"
    
    def update_stats(self):
        """Recalcula todas as estatísticas baseado nos badges do usuário"""
        user_badges = UserBadge.objects.filter(user=self.user).select_related('badge_definition')
        
        # Resetar contadores
        self.bronze_badges = 0
        self.silver_badges = 0
        self.gold_badges = 0
        self.proind_badges = 0
        self.prodepe_badges = 0
        self.prodeauto_badges = 0
        
        for badge in user_badges:
            # Contar por tipo
            if badge.badge_definition.badge_type == 'BRONZE':
                self.bronze_badges += 1
            elif badge.badge_definition.badge_type == 'SILVER':
                self.silver_badges += 1
            elif badge.badge_definition.badge_type == 'GOLD':
                self.gold_badges += 1
            
            # Contar por programa
            if badge.badge_definition.program == 'PROIND':
                self.proind_badges += 1
            elif badge.badge_definition.program == 'PRODEPE':
                self.prodepe_badges += 1
            elif badge.badge_definition.program == 'PRODEAUTO':
                self.prodeauto_badges += 1
        
        # Totais
        self.total_badges = self.bronze_badges + self.silver_badges + self.gold_badges
        self.completion_percentage = (self.total_badges / 36) * 100
        
        # Timestamps
        if user_badges:
            first_badge = user_badges.order_by('earned_at').first()
            last_badge = user_badges.order_by('-earned_at').first()
            self.first_badge_earned = first_badge.earned_at if first_badge else None
            self.last_badge_earned = last_badge.earned_at if last_badge else None
        
        self.save()

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
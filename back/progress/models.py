from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

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

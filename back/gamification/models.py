from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.core.validators import MinValueValidator, MaxValueValidator

User = get_user_model()

class Program(models.Model):
    """Programas: PRODEPE, PRODEAUTO, PROIND"""
    PROGRAM_CHOICES = [
        ('PRODEPE', 'PRODEPE'),
        ('PRODEAUTO', 'PRODEAUTO'), 
        ('PROIND', 'PROIND'),
    ]
    
    name = models.CharField(max_length=20, choices=PROGRAM_CHOICES, unique=True)
    display_name = models.CharField(max_length=100)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.display_name

class Trail(models.Model):
    """Trilhas - 4 por programa (12 total)"""
    program = models.ForeignKey(Program, on_delete=models.CASCADE, related_name='trails')
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    page_url = models.CharField(
        max_length=255, 
        help_text="URL da página da trilha (ex: /trilhas/prodepe/trilha-1)",
        unique=True
    )
    description = models.TextField()
    order = models.PositiveIntegerField(help_text="Ordem dentro do programa (1-4)")
    difficulty_level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        default=1
    )
    estimated_duration = models.DurationField(help_text="Duração estimada")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ['program', 'order']
        ordering = ['program', 'order']
    
    def __str__(self):
        return f"{self.program.name} - {self.title}"

class UserTrailProgress(models.Model):
    """Progresso das trilhas - apenas para badges/recomendações"""
    STATUS_CHOICES = [
        ('NOT_STARTED', 'Não Iniciado'),
        ('COMPLETED', 'Concluído'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='trail_progress')
    trail = models.ForeignKey(Trail, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NOT_STARTED')
    completed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        unique_together = ['user', 'trail']
        
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.trail.title}"
    
    def mark_as_completed(self):
        """Marca trilha como concluída"""
        if self.status != 'COMPLETED':
            self.status = 'COMPLETED'
            self.completed_at = timezone.now()
            self.save()
            
            # Apenas verifica badges - certificados são separados
            from .services import BadgeService
            BadgeService.check_and_award_badges(self.user)
            return True
        return False

class BadgeType(models.Model):
    """Tipos de badges com imagens"""
    BADGE_CATEGORIES = [
        ('PROGRESS', 'Progresso'),
        ('COMPLETION', 'Conclusão'),
        ('EXPLORATION', 'Exploração'),
        ('DEDICATION', 'Dedicação'),
        ('SPECIAL', 'Especial'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    category = models.CharField(max_length=20, choices=BADGE_CATEGORIES)
    image = models.ImageField(
        upload_to='badges/', 
        help_text="Imagem do badge"
    )
    color = models.CharField(max_length=7, default='#4F63D2')
    is_active = models.BooleanField(default=True)
    
    # Critérios para badge
    required_trails_count = models.PositiveIntegerField(null=True, blank=True)
    required_programs_count = models.PositiveIntegerField(null=True, blank=True)
    specific_program = models.ForeignKey(Program, null=True, blank=True, on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class UserBadge(models.Model):
    """Badges obtidos pelos usuários"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='badges')
    badge_type = models.ForeignKey(BadgeType, on_delete=models.CASCADE)
    earned_at = models.DateTimeField(auto_now_add=True)
    progress_count = models.PositiveIntegerField(default=0)
    
    class Meta:
        unique_together = ['user', 'badge_type']
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.badge_type.name}"

class Certificate(models.Model):
    """Certificados - gestão independente das trilhas"""
    name = models.CharField(max_length=200)
    description = models.TextField()
    template_file = models.CharField(max_length=255, help_text="Template do certificado")
    
    # Campos opcionais para categorização (não há critérios automáticos)
    category = models.CharField(max_length=100, blank=True)
    program = models.ForeignKey(Program, null=True, blank=True, on_delete=models.CASCADE)
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class UserCertificate(models.Model):
    """Certificados concedidos manualmente aos usuários"""
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    certificate = models.ForeignKey(Certificate, on_delete=models.CASCADE)
    
    # Campos para gestão manual
    issued_at = models.DateTimeField(auto_now_add=True)
    issued_by = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='certificates_issued',
        help_text="Admin que concedeu o certificado"
    )
    certificate_code = models.CharField(max_length=50, unique=True)
    pdf_file = models.FileField(upload_to='certificates/', null=True, blank=True)
    
    # Campos adicionais para controle manual
    notes = models.TextField(blank=True, help_text="Observações sobre a concessão")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['user', 'certificate']
    
    def save(self, *args, **kwargs):
        if not self.certificate_code:
            self.certificate_code = f"CERT-{self.user.id}-{self.certificate.id}-{timezone.now().strftime('%Y%m%d%H%M')}"
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.user.get_full_name()} - {self.certificate.name}"

class UserStats(models.Model):
    """Estatísticas do usuário - SEM certificados automáticos"""
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='stats')
    
    # Apenas trilhas e badges (certificados são manuais)
    trilhas_concluidas = models.PositiveIntegerField(default=0)
    desafios_feitos = models.PositiveIntegerField(default=0)
    programas_concluidos = models.PositiveIntegerField(default=0)
    badges_obtidas = models.PositiveIntegerField(default=0)
    
    # Certificados são contados mas não influenciam lógica
    certificados_obtidos = models.PositiveIntegerField(default=0)
    
    last_activity = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def update_stats(self):
        """Atualiza estatísticas - certificados apenas contabilizados"""
        # Trilhas
        self.trilhas_concluidas = self.user.trail_progress.filter(status='COMPLETED').count()
        
        # Programas
        completed_programs = set()
        for progress in self.user.trail_progress.filter(status='COMPLETED'):
            program_trails_count = Trail.objects.filter(program=progress.trail.program, is_active=True).count()
            completed_trails_in_program = self.user.trail_progress.filter(
                trail__program=progress.trail.program,
                status='COMPLETED'
            ).count()
            
            if completed_trails_in_program == program_trails_count:
                completed_programs.add(progress.trail.program_id)
        
        self.programas_concluidos = len(completed_programs)
        
        # Badges e Certificados (apenas contagem)
        self.badges_obtidas = self.user.badges.count()
        self.certificados_obtidos = self.user.certificates.filter(is_active=True).count()
        
        self.save()
    
    def __str__(self):
        return f"Stats - {self.user.get_full_name()}"

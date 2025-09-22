from django.contrib import admin
from .models import (
    Program, Trail, UserTrailProgress, BadgeType, UserBadge, 
    Certificate, UserCertificate, UserStats
)

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ['name', 'display_name', 'created_at']
    list_filter = ['name']
    search_fields = ['name', 'display_name']

@admin.register(Trail)
class TrailAdmin(admin.ModelAdmin):
    list_display = ['title', 'program', 'page_url', 'order', 'is_active']
    list_filter = ['program', 'is_active']
    search_fields = ['title', 'page_url']
    prepopulated_fields = {'slug': ('title',)}
    ordering = ['program', 'order']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'program', 'order')
        }),
        ('URL e Conteúdo', {
            'fields': ('page_url', 'description', 'difficulty_level', 'estimated_duration')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )

@admin.register(BadgeType)
class BadgeTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'required_trails_count', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'description']
    prepopulated_fields = {'slug': ('name',)}
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'slug', 'description', 'category')
        }),
        ('Visual', {
            'fields': ('image', 'color')
        }),
        ('Critérios', {
            'fields': ('required_trails_count', 'required_programs_count', 'specific_program')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )

@admin.register(UserTrailProgress)
class UserTrailProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'trail', 'status', 'completed_at']
    list_filter = ['status', 'trail__program']
    search_fields = ['user__first_name', 'user__last_name', 'trail__title']
    readonly_fields = ['completed_at']

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ['user', 'badge_type', 'earned_at', 'progress_count']
    list_filter = ['badge_type__category', 'earned_at']
    search_fields = ['user__first_name', 'user__last_name', 'badge_type__name']
    readonly_fields = ['earned_at']

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'program', 'is_active', 'created_at']
    list_filter = ['category', 'program', 'is_active']
    search_fields = ['name', 'description']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('name', 'description', 'category')
        }),
        ('Configuração', {
            'fields': ('program', 'template_file')
        }),
        ('Status', {
            'fields': ('is_active',)
        }),
    )

@admin.register(UserCertificate)
class UserCertificateAdmin(admin.ModelAdmin):
    list_display = ['user', 'certificate', 'issued_at', 'issued_by', 'is_active']
    list_filter = ['certificate__category', 'is_active', 'issued_at']
    search_fields = ['user__first_name', 'user__last_name', 'certificate__name']
    readonly_fields = ['certificate_code', 'issued_at']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('user', 'certificate')
        }),
        ('Concessão', {
            'fields': ('issued_by', 'notes', 'is_active')
        }),
        ('Sistema', {
            'fields': ('certificate_code', 'issued_at', 'pdf_file'),
            'classes': ('collapse',)
        }),
    )
    
    def save_model(self, request, obj, form, change):
        if not change:  # Novo certificado
            obj.issued_by = request.user
        super().save_model(request, obj, form, change)

@admin.register(UserStats)
class UserStatsAdmin(admin.ModelAdmin):
    list_display = ['user', 'trilhas_concluidas', 'badges_obtidas', 'certificados_obtidos', 'last_activity']
    search_fields = ['user__first_name', 'user__last_name']
    readonly_fields = ['trilhas_concluidas', 'badges_obtidas', 'certificados_obtidos', 'last_activity', 'updated_at']
    
    def has_add_permission(self, request):
        return False  # Não permite criar manualmente

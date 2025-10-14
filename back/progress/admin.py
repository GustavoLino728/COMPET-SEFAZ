from django.contrib import admin
from .models import (
    TrailAccess, UserProgramProgress, UserOverallProgress,
    BadgeDefinition, ChallengeCompletion, UserBadge
)

@admin.register(TrailAccess)
class TrailAccessAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'trail_number', 'trail_id', 'access_count', 'last_access']
    list_filter = ['program', 'trail_number', 'first_access']
    search_fields = ['user__email']  # Removido trail_id pois é @property
    readonly_fields = ['first_access', 'last_access', 'trail_id']  # trail_id é calculado

@admin.register(UserProgramProgress)
class UserProgramProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'progress_percentage', 'last_accessed_trail', 'total_access_count', 'updated_at']
    list_filter = ['program', 'updated_at']
    search_fields = ['user__email']
    readonly_fields = ['created_at', 'updated_at', 'progress_percentage', 'last_accessed_trail', 'total_access_count']

@admin.register(UserOverallProgress)
class UserOverallProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_trails_accessed', 'overall_percentage', 'updated_at']
    search_fields = ['user__email']
    readonly_fields = [
        'created_at', 'updated_at', 'total_trails_accessed', 'total_access_count',
        'programs_started', 'programs_completed', 'overall_percentage'
    ]

@admin.register(BadgeDefinition)
class BadgeDefinitionAdmin(admin.ModelAdmin):
    list_display = ['name', 'program', 'trail_number', 'difficulty', 'badge_type', 'is_active']
    list_filter = ['program', 'difficulty', 'badge_type', 'is_active']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'name']  # name é gerado automaticamente

@admin.register(ChallengeCompletion)
class ChallengeCompletionAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'trail_number', 'difficulty', 'score', 'completed_at']
    list_filter = ['program', 'difficulty', 'completed_at']
    search_fields = ['user__email']
    readonly_fields = ['completed_at']

@admin.register(UserBadge)
class UserBadgeAdmin(admin.ModelAdmin):
    list_display = ['user', 'badge_definition', 'earned_at']
    list_filter = ['badge_definition__program', 'badge_definition__difficulty', 'earned_at']
    search_fields = ['user__email', 'badge_definition__name']
    readonly_fields = ['earned_at']
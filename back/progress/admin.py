from django.contrib import admin
from .models import (
    TrailAccess, UserProgramProgress, UserOverallProgress,
    BadgeDefinition, ChallengeCompletion, UserBadge, UserBadgeStats
)

@admin.register(TrailAccess)
class TrailAccessAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'trail_number', 'trail_id', 'access_count', 'last_access']
    list_filter = ['program', 'trail_number', 'first_access']
    search_fields = ['user__email', 'trail_id']
    readonly_fields = ['first_access', 'last_access']

@admin.register(UserProgramProgress)
class UserProgramProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'program', 'progress_percentage', 'last_accessed_trail', 'updated_at']
    list_filter = ['program', 'updated_at']
    search_fields = ['user__email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(UserOverallProgress)
class UserOverallProgressAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_trails_accessed', 'overall_percentage', 'updated_at']
    search_fields = ['user__email']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(BadgeDefinition)
class BadgeDefinitionAdmin(admin.ModelAdmin):
    list_display = ['name', 'program', 'trail_number', 'difficulty', 'badge_type', 'is_active']
    list_filter = ['program', 'difficulty', 'badge_type', 'is_active']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at']

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

@admin.register(UserBadgeStats)
class UserBadgeStatsAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_badges', 'completion_percentage', 'bronze_badges', 'silver_badges', 'gold_badges']
    search_fields = ['user__email']
    readonly_fields = ['updated_at', 'first_badge_earned', 'last_badge_earned']
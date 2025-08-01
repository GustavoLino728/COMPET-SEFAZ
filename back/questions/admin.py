from django.contrib import admin
from .models import Question, Option


class OptionInline(admin.TabularInline):
    model = Option
    extra = 0


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['topic', 'question_text', 'difficulty', 'is_active', 'created_at']
    list_filter = ['difficulty', 'is_active', 'created_at', 'topic']
    search_fields = ['question_text', 'topic', 'explanation']
    readonly_fields = ['created_at', 'updated_at']
    inlines = [OptionInline]
    
    fieldsets = (
        ('Question Information', {
            'fields': ('question_text', 'topic', 'explanation', 'difficulty')
        }),
        ('AI Metrics', {
            'fields': ('confidence_score', 'avg_similarity_score'),
            'classes': ('collapse',)
        }),
        ('Status', {
            'fields': ('is_active', 'created_at', 'updated_at')
        }),
    )


@admin.register(Option)
class OptionAdmin(admin.ModelAdmin):
    list_display = ['question', 'option_text', 'is_correct', 'created_at']
    list_filter = ['is_correct', 'created_at']
    search_fields = ['option_text', 'question__topic']
    readonly_fields = ['created_at']
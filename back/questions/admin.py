from django.contrib import admin
from .models import Question, Option, Program, Track, Challenge, Source, ProblemQuestion, MultipleChoiceQuestion


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

@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('name', 'program')
    list_filter = ('program',)
    search_fields = ('name',)

class ProblemQuestionInline(admin.TabularInline):
    model = ProblemQuestion
    extra = 0

class MultipleChoiceQuestionInline(admin.TabularInline):
    model = MultipleChoiceQuestion
    extra = 0

@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'track', 'difficulty')
    list_filter = ('track', 'difficulty')
    search_fields = ('title',)
    inlines = [ProblemQuestionInline, MultipleChoiceQuestionInline]
    filter_horizontal = ('sources',)

@admin.register(Source)
class SourceAdmin(admin.ModelAdmin):
    list_display = ('file_name',)
    search_fields = ('file_name',)
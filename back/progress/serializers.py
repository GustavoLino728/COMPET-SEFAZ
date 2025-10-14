from rest_framework import serializers
from .models import TrailAccess, UserProgramProgress, UserOverallProgress, CertificateTest

class TrailAccessSerializer(serializers.ModelSerializer):
    trail_id = serializers.ReadOnlyField()
    
    class Meta:
        model = TrailAccess
        fields = ['trail_id', 'program', 'trail_number', 'first_access', 
                 'last_access', 'access_count']
        read_only_fields = ['first_access', 'last_access', 'access_count', 'trail_id']

class UserProgramProgressSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    is_completed = serializers.ReadOnlyField()
    next_trail = serializers.ReadOnlyField()
    last_accessed_trail = serializers.ReadOnlyField() 
    total_access_count = serializers.ReadOnlyField()
    
    class Meta:
        model = UserProgramProgress
        fields = ['program', 'trails_accessed', 'progress_percentage', 'is_completed',
                 'next_trail', 'last_accessed_trail', 'total_access_count', 
                 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'last_accessed_trail', 'total_access_count']

class UserOverallProgressSerializer(serializers.ModelSerializer):
    total_trails_accessed = serializers.ReadOnlyField()
    total_access_count = serializers.ReadOnlyField()
    programs_started = serializers.ReadOnlyField()
    programs_completed = serializers.ReadOnlyField()
    overall_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = UserOverallProgress
        fields = ['total_trails_accessed', 'total_access_count', 
                 'programs_started', 'programs_completed', 'overall_percentage',
                 'created_at', 'updated_at']
        read_only_fields = ['total_trails_accessed', 'total_access_count',
                          'programs_started', 'programs_completed', 'created_at', 'updated_at']

class TrackTrailAccessSerializer(serializers.Serializer):
    """Serializer para receber dados de tracking do frontend"""
    program = serializers.ChoiceField(choices=TrailAccess.PROGRAMS)
    trail_number = serializers.IntegerField(min_value=1, max_value=4)

class CertificateTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificateTest
        fields = ['id', 'program', 'track', 'score', 'correct_answers', 
                 'total_questions', 'passed', 'answers', 'started_at', 'completed_at']
        read_only_fields = ['id', 'started_at', 'completed_at']

class CertificateTestSubmissionSerializer(serializers.Serializer):
    """Serializer para submissão de teste de certificado"""
    program = serializers.ChoiceField(choices=CertificateTest.PROGRAMS)
    track = serializers.CharField(max_length=100)
    answers = serializers.ListField(
        child=serializers.DictField(),
        min_length=1
    )
    score = serializers.DecimalField(max_digits=5, decimal_places=2, min_value=0, max_value=100)
    passed = serializers.BooleanField()
from rest_framework import serializers
from .models import TrailAccess, UserProgramProgress, UserOverallProgress

class TrailAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrailAccess
        fields = ['trail_id', 'program', 'trail_number', 'first_access', 
                 'last_access', 'access_count']
        read_only_fields = ['first_access', 'last_access', 'access_count']

class UserProgramProgressSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.ReadOnlyField()
    is_completed = serializers.ReadOnlyField()
    next_trail = serializers.ReadOnlyField()
    
    class Meta:
        model = UserProgramProgress
        fields = ['program', 'last_accessed_trail', 'trails_accessed', 
                 'total_access_count', 'progress_percentage', 'is_completed',
                 'next_trail', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at', 'total_access_count']

class UserOverallProgressSerializer(serializers.ModelSerializer):
    overall_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = UserOverallProgress
        fields = ['total_trails_accessed', 'total_access_count', 
                 'programs_started', 'programs_completed', 'overall_percentage',
                 'first_access', 'last_access']
        read_only_fields = ['total_trails_accessed', 'total_access_count',
                          'programs_started', 'programs_completed', 
                          'first_access', 'last_access']

class TrackTrailAccessSerializer(serializers.Serializer):
    """Serializer para receber dados de tracking do frontend"""
    trail_id = serializers.CharField(max_length=100)
    program = serializers.ChoiceField(choices=TrailAccess.PROGRAMS)
    trail_number = serializers.IntegerField(min_value=1, max_value=4)
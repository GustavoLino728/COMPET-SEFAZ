from rest_framework import serializers
from .models import (
    Trail, Program, UserTrailProgress, BadgeType, UserBadge,
    Certificate, UserCertificate, UserStats
)

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = ['id', 'name', 'display_name', 'description']

class TrailSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    
    class Meta:
        model = Trail
        fields = ['id', 'title', 'slug', 'description', 'program', 'order', 
                 'difficulty_level', 'estimated_duration', 'page_url']

class UserProgressSerializer(serializers.ModelSerializer):
    trail = TrailSerializer(read_only=True)
    
    class Meta:
        model = UserTrailProgress
        fields = ['trail', 'status', 'completed_at']

class BadgeTypeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None
    
    class Meta:
        model = BadgeType
        fields = ['id', 'name', 'description', 'category', 'image_url', 'color']

class UserBadgeSerializer(serializers.ModelSerializer):
    badge_type = BadgeTypeSerializer(read_only=True)
    
    class Meta:
        model = UserBadge
        fields = ['badge_type', 'earned_at', 'progress_count']

class CertificateSerializer(serializers.ModelSerializer):
    program = ProgramSerializer(read_only=True)
    
    class Meta:
        model = Certificate
        fields = ['id', 'name', 'description', 'category', 'program']

class UserCertificateSerializer(serializers.ModelSerializer):
    certificate = CertificateSerializer(read_only=True)
    issued_by_name = serializers.SerializerMethodField()
    pdf_url = serializers.SerializerMethodField()
    
    def get_issued_by_name(self, obj):
        if obj.issued_by:
            return obj.issued_by.get_full_name() or obj.issued_by.username
        return None
    
    def get_pdf_url(self, obj):
        if obj.pdf_file:
            return obj.pdf_file.url
        return None
    
    class Meta:
        model = UserCertificate
        fields = ['certificate', 'issued_at', 'issued_by_name', 'certificate_code', 
                 'pdf_url', 'notes', 'is_active']

class UserStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserStats
        fields = ['trilhas_concluidas', 'desafios_feitos', 'programas_concluidos',
                 'badges_obtidas', 'certificados_obtidos', 'last_activity']

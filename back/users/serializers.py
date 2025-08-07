from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'cpf', 'password', 'linkedin_url', 'interest_area', 'field_of_work', 'is_auditor']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = ['id', 'username', 'email', 'cpf', 'password', 'linkedin_url', 'interest_area', 'field_of_work', 'is_auditor']

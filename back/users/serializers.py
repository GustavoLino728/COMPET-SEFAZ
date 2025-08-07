from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['cpf', 'linkedin_url', 'areas_of_interest', 'is_auditor']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile.cpf = profile_data.get('cpf', profile.cpf)
        profile.linkedin_url = profile_data.get('linkedin_url', profile.linkedin_url)
        profile.areas_of_interest = profile_data.get('areas_of_interest', profile.areas_of_interest)
        profile.is_auditor = profile_data.get('is_auditor', profile.is_auditor)
        profile.save()

        return instance
# Dentro do arquivo usuarios/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile

# 1. Primeiro, criamos um tradutor SÓ para o Perfil
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        # Listamos os campos que queremos do Perfil
        fields = ['cpf', 'linkedin_url', 'areas_of_interest', 'is_auditor']

# 2. Agora, o tradutor principal do Usuário, que vai usar o tradutor do Perfil
class UserSerializer(serializers.ModelSerializer):
    # 'profile' é o nome do nosso campo "grampeado". Usamos o ProfileSerializer aqui.
    profile = ProfileSerializer()

    class Meta:
        model = User
        # Listamos os campos que queremos do User, e adicionamos o 'profile'
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

    # 3. Mágica para CRIAR um usuário e seu perfil de uma vez só
    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user, **profile_data)
        return user

    # 4. Mágica para ATUALIZAR um usuário e seu perfil de uma vez só
    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile')
        profile = instance.profile

        # Atualiza os campos do User
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        # Atualiza os campos do Profile
        profile.cpf = profile_data.get('cpf', profile.cpf)
        profile.linkedin_url = profile_data.get('linkedin_url', profile.linkedin_url)
        profile.areas_of_interest = profile_data.get('areas_of_interest', profile.areas_of_interest)
        profile.is_auditor = profile_data.get('is_auditor', profile.is_auditor)
        profile.save()

        return instance
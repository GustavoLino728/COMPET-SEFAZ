from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from .models import CustomUser
import re

class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name', 'full_name', 
            'cpf', 'linkedin_url', 'interest_area', 'field_of_work', 'is_auditor',
            'is_staff', 'is_superuser'
        ]

        extra_kwargs = {
            'linkedin_url': {'required': False, 'allow_blank': True},
            'interest_area': {'required': False, 'allow_blank': True},
            'field_of_work': {'required': False, 'allow_blank': True},
            'is_auditor': {'required': False},
        }

class CustomUserCreateSerializer(UserCreateSerializer):
    first_name = serializers.CharField(required=True, max_length=150)
    last_name = serializers.CharField(required=True, max_length=150)
    cpf = serializers.CharField(required=True, max_length=14)  
    re_password = serializers.CharField(write_only=True)  
    
    class Meta(UserCreateSerializer.Meta):
        model = CustomUser
        fields = [
            'id', 'email', 'first_name', 'last_name', 'cpf', 
            'password', 're_password', 
            'linkedin_url', 'interest_area', 'field_of_work', 'is_auditor'
        ]

    def validate(self, attrs):

        if attrs.get('password') != attrs.get('re_password'):
            raise serializers.ValidationError({
                "re_password": "As senhas não coincidem."
            })

        re_password = attrs.pop('re_password', None)
        validated_data = super().validate(attrs)
        
        return validated_data

    def create(self, validated_data):
        validated_data.pop('re_password', None)
        return super().create(validated_data)

    def validate_cpf(self, value):
        
        cpf_numbers = re.sub(r'[^\d]', '', value)

        if len(cpf_numbers) != 11:
            raise serializers.ValidationError("CPF deve ter 11 dígitos.")
        
        if cpf_numbers == cpf_numbers[0] * 11:
            raise serializers.ValidationError("CPF inválido.")

        if not self._validate_cpf_digits(cpf_numbers):
            raise serializers.ValidationError("CPF inválido.")

        if CustomUser.objects.filter(cpf=cpf_numbers).exists():
            raise serializers.ValidationError("Este CPF já está cadastrado.")
        
        return cpf_numbers
    
    def _validate_cpf_digits(self, cpf):
        """Validação matemática do CPF"""
        sum1 = sum(int(cpf[i]) * (10 - i) for i in range(9))
        digit1 = (sum1 * 10) % 11
        if digit1 == 10:
            digit1 = 0

        sum2 = sum(int(cpf[i]) * (11 - i) for i in range(10))
        digit2 = (sum2 * 10) % 11
        if digit2 == 10:
            digit2 = 0
        
        return cpf[9] == str(digit1) and cpf[10] == str(digit2)

class CustomUserPartialUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ['email', 'first_name', 'last_name', 'cpf', 'password']
        extra_kwargs = {
            'linkedin_url': {'required': False, 'allow_blank': True},
            'interest_area': {'required': False, 'allow_blank': True},
            'field_of_work': {'required': False, 'allow_blank': True},
            'is_auditor': {'required': False},
        }

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'
    
    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }
        
        user = authenticate(request=self.context.get('request'), **credentials)
        if not user:
            raise serializers.ValidationError('Credenciais inválidas')
        
        attrs['username'] = user.email
        return super().validate(attrs)
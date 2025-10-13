#!/bin/bash

echo "🐳 Criando usuário administrador via Docker..."

# Nome do container Django (ajuste se necessário)
CONTAINER_NAME="compet-sefaz-django-1"

# Verificar se o container está rodando
if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "❌ Container Django não está rodando!"
    echo "🔧 Execute: docker-compose up -d"
    exit 1
fi

echo "✅ Container encontrado: $CONTAINER_NAME"

# Criar o usuário administrador via Django shell
docker exec -it $CONTAINER_NAME python manage.py shell -c "
from users.models import CustomUser

# Verificar se o usuário já existe
email = 'admin@sefaz.com'
if CustomUser.objects.filter(email=email).exists():
    print('⚠️  Usuário já existe! Atualizando permissões...')
    user = CustomUser.objects.get(email=email)
else:
    print('🚀 Criando novo usuário...')
    user = CustomUser.objects.create_user(
        email=email,
        password='admin12345',
        first_name='Admin',
        last_name='Sistema',
        cpf='12345678901'
    )

# Definir como administrador
user.is_staff = True
user.is_superuser = True
user.save()

print('✅ Usuário administrador criado/atualizado!')
print(f'📧 Email: {user.email}')
print(f'🔑 Senha: admin123')
print(f'👤 Staff: {user.is_staff}')
print(f'🔧 Superuser: {user.is_superuser}')
"

echo ""
echo "🎯 Agora você pode fazer login no frontend com:"
echo "   Email: admin@sefaz.com"
echo "   Senha: admin123"
echo ""
echo "✨ O card 'Painel Administrativo' deve aparecer na página inicial!"

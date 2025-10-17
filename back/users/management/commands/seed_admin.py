from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.conf import settings
import os

User = get_user_model()

class Command(BaseCommand):
    help = 'Cria ou atualiza usuário administrador padrão'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            type=str,
            default='admin@sefaz.com',
            help='Email do usuário administrador (padrão: admin@sefaz.com)'
        )
        parser.add_argument(
            '--password',
            type=str,
            default='admin12345',
            help='Senha do usuário administrador (padrão: admin12345)'
        )
        parser.add_argument(
            '--force',
            action='store_true',
            help='Força a atualização da senha mesmo se o usuário já existir'
        )

    def handle(self, *args, **options):
        email = options['email']
        password = options['password']
        force = options['force']
        
        self.stdout.write(
            self.style.SUCCESS('🚀 Iniciando seed do usuário administrador...')
        )
        
        try:
            # Verificar se o usuário já existe
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                
                if force:
                    # Atualizar senha se forçado
                    user.set_password(password)
                    self.stdout.write(
                        self.style.WARNING(f'⚠️  Usuário {email} já existe. Atualizando senha...')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'⚠️  Usuário {email} já existe. Use --force para atualizar a senha.')
                    )
            else:
                # Criar novo usuário
                user = User.objects.create_user(
                    email=email,
                    password=password,
                    first_name='Admin',
                    last_name='Sistema',
                    cpf='12345678901'
                )
                self.stdout.write(
                    self.style.SUCCESS(f'✅ Usuário {email} criado com sucesso!')
                )
            
            # Garantir permissões de administrador
            user.is_staff = True
            user.is_superuser = True
            user.is_active = True
            user.save()
            
            self.stdout.write(
                self.style.SUCCESS('✅ Permissões de administrador configuradas!')
            )
            
            # Exibir informações do usuário
            self.stdout.write('\n' + '='*50)
            self.stdout.write(
                self.style.SUCCESS('🎯 USUÁRIO ADMINISTRADOR CONFIGURADO')
            )
            self.stdout.write('='*50)
            self.stdout.write(f'📧 Email: {user.email}')
            self.stdout.write(f'🔑 Senha: {password}')
            self.stdout.write(f'👤 Nome: {user.full_name}')
            self.stdout.write(f'🔧 Staff: {user.is_staff}')
            self.stdout.write(f'🔧 Superuser: {user.is_superuser}')
            self.stdout.write(f'✅ Ativo: {user.is_active}')
            self.stdout.write('='*50)
            
            # Verificar se está em ambiente de produção
            if not settings.DEBUG:
                self.stdout.write(
                    self.style.WARNING(
                        '⚠️  ATENÇÃO: Você está em ambiente de PRODUÇÃO!'
                    )
                )
                self.stdout.write(
                    self.style.WARNING(
                        '🔒 Considere alterar a senha padrão após o primeiro login.'
                    )
                )
            
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao criar usuário administrador: {str(e)}')
            )
            raise

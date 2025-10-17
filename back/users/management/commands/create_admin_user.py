from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

class Command(BaseCommand):
    help = 'Cria um usuário administrador padrão'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            type=str,
            default='admin@gmail.com',
            help='Email do usuário administrador'
        )
        parser.add_argument(
            '--password',
            type=str,
            default='admin12345',
            help='Senha do usuário administrador'
        )

    def handle(self, *args, **options):
        email = options['email']
        password = options['password']
        
        try:
            # Verifica se o usuário já existe
            if User.objects.filter(email=email).exists():
                self.stdout.write(
                    self.style.WARNING(f'Usuário com email {email} já existe!')
                )
                return
            
            # Cria o usuário administrador
            admin_user = User.objects.create_superuser(
                email=email,
                password=password,
                first_name='Administrador',
                last_name='Sistema',
                cpf='000.000.000-00',  # CPF fictício para o admin
                is_auditor=True
            )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Usuário administrador criado com sucesso!\n'
                    f'   Email: {email}\n'
                    f'   Senha: {password}\n'
                    f'   Nome: {admin_user.full_name}\n'
                    f'   ID: {admin_user.id}'
                )
            )
            
        except IntegrityError as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao criar usuário: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro inesperado: {e}')
            )

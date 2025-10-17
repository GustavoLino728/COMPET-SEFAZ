from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

class Command(BaseCommand):
    help = 'Garante que existe um usuário administrador no sistema'

    def handle(self, *args, **options):
        admin_email = 'admin@gmail.com'
        admin_password = 'admin12345'
        
        try:
            # Verifica se já existe um usuário com esse email
            existing_user = User.objects.filter(email=admin_email).first()
            
            if existing_user:
                # Se existe, garante que é superusuário
                if not existing_user.is_superuser:
                    existing_user.is_superuser = True
                    existing_user.is_staff = True
                    existing_user.save()
                    self.stdout.write(
                        self.style.SUCCESS(f'✅ Usuário {admin_email} atualizado para superusuário!')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING(f'Usuário administrador já existe: {admin_email}')
                    )
                return
            
            # Cria o usuário administrador padrão
            admin_user = User.objects.create_superuser(
                email=admin_email,
                password=admin_password,
                first_name='Administrador',
                last_name='Sistema',
                cpf='000.000.000-00',
                is_auditor=True
            )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'✅ Usuário administrador criado!\n'
                    f'   Email: {admin_email}\n'
                    f'   Senha: {admin_password}'
                )
            )
            
        except IntegrityError as e:
            self.stdout.write(
                self.style.WARNING(f'Usuário já existe ou erro de integridade: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao criar usuário administrador: {e}')
            )

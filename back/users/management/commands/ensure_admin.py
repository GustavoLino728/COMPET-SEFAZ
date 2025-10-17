from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError, transaction

User = get_user_model()

class Command(BaseCommand):
    help = 'Garante que sempre existe um usuário administrador (admin@gmail.com / admin12345)'

    def handle(self, *args, **options):
        admin_email = 'admin@gmail.com'
        admin_password = 'admin12345'
        
        try:
            with transaction.atomic():
                # Tenta encontrar ou criar o usuário admin
                admin_user, created = User.objects.get_or_create(
                    email=admin_email,
                    defaults={
                        'first_name': 'Administrador',
                        'last_name': 'Sistema',
                        'cpf': '000.000.000-00',
                        'is_superuser': True,
                        'is_staff': True,
                        'is_active': True,
                        'is_auditor': True
                    }
                )
                
                # Se o usuário já existia, garante que tem as permissões corretas
                if not created:
                    admin_user.is_superuser = True
                    admin_user.is_staff = True
                    admin_user.is_active = True
                    admin_user.first_name = 'Administrador'
                    admin_user.last_name = 'Sistema'
                    admin_user.cpf = '000.000.000-00'
                    admin_user.is_auditor = True
                
                # Define a senha (sempre atualiza)
                admin_user.set_password(admin_password)
                admin_user.save()
                
                if created:
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'✅ Usuário administrador criado!\n'
                            f'   Email: {admin_email}\n'
                            f'   Senha: {admin_password}'
                        )
                    )
                else:
                    self.stdout.write(
                        self.style.SUCCESS(
                            f'✅ Usuário administrador atualizado!\n'
                            f'   Email: {admin_email}\n'
                            f'   Senha: {admin_password}'
                        )
                    )
                
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro ao garantir usuário administrador: {e}')
            )
            # Em caso de erro, tenta criar um superusuário básico
            try:
                if not User.objects.filter(is_superuser=True).exists():
                    User.objects.create_superuser(
                        email=admin_email,
                        password=admin_password,
                        first_name='Admin',
                        last_name='User',
                        cpf='000.000.000-00'
                    )
                    self.stdout.write(
                        self.style.SUCCESS('✅ Usuário administrador de emergência criado!')
                    )
            except Exception as e2:
                self.stdout.write(
                    self.style.ERROR(f'❌ Falha crítica ao criar admin: {e2}')
                )

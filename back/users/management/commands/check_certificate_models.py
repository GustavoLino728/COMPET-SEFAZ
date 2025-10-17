from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Verifica se os modelos de certificado estão funcionando'

    def handle(self, *args, **options):
        try:
            # Tentar importar os modelos
            from progress.models import CertificateTest, UserCertificate
            self.stdout.write(
                self.style.SUCCESS('✅ Modelos importados com sucesso')
            )
            
            # Verificar se as tabelas existem
            with connection.cursor() as cursor:
                # Verificar tabela CertificateTest
                cursor.execute("""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name='progress_certificatetest';
                """)
                cert_test_table = cursor.fetchone()
                
                if cert_test_table:
                    self.stdout.write(
                        self.style.SUCCESS('✅ Tabela progress_certificatetest existe')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING('⚠️ Tabela progress_certificatetest não encontrada')
                    )
                
                # Verificar tabela UserCertificate
                cursor.execute("""
                    SELECT name FROM sqlite_master 
                    WHERE type='table' AND name='progress_usercertificate';
                """)
                user_cert_table = cursor.fetchone()
                
                if user_cert_table:
                    self.stdout.write(
                        self.style.SUCCESS('✅ Tabela progress_usercertificate existe')
                    )
                else:
                    self.stdout.write(
                        self.style.WARNING('⚠️ Tabela progress_usercertificate não encontrada')
                    )
            
            # Tentar criar um objeto de teste (sem salvar)
            test_cert = CertificateTest(
                program='PROIND',
                track='T1',
                score=80.0,
                correct_answers=4,
                total_questions=5,
                passed=True,
                answers=[]
            )
            
            self.stdout.write(
                self.style.SUCCESS('✅ Objeto CertificateTest criado com sucesso')
            )
            
        except ImportError as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro de importação: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'❌ Erro inesperado: {e}')
            )

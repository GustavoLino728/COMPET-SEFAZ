#!/usr/bin/env python3
"""
Script para verificar se os modelos estão sendo importados corretamente
"""
import os
import sys
import django

# Adicionar o diretório do projeto ao path
sys.path.append('/home/fernando/Desktop/ubuntu_note/Desktop/Developer/cesar/compet/project_versions/compet_final/COMPET-SEFAZ/back')

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

def check_models():
    print("🔍 Verificando modelos...")
    
    try:
        from progress.models import CertificateTest, UserCertificate
        print("✅ CertificateTest importado com sucesso")
        print(f"   - Campos: {[field.name for field in CertificateTest._meta.fields]}")
        
        print("✅ UserCertificate importado com sucesso")
        print(f"   - Campos: {[field.name for field in UserCertificate._meta.fields]}")
        
        # Verificar se as tabelas existem
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name LIKE '%certificate%';")
            tables = cursor.fetchall()
            print(f"📊 Tabelas de certificado encontradas: {[table[0] for table in tables]}")
        
        return True
        
    except ImportError as e:
        print(f"❌ Erro de importação: {e}")
        return False
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        return False

if __name__ == "__main__":
    check_models()

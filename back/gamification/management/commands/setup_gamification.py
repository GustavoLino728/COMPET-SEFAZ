from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from gamification.models import Program, Trail, BadgeType
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Configura dados iniciais para o sistema de gamificação'

    def handle(self, *args, **options):
        self.stdout.write('Criando programas...')
        
        # Criar programas
        programs_data = [
            {
                'name': 'PRODEPE',
                'display_name': 'Programa de Desenvolvimento de Pernambuco',
                'description': 'Programa que oferece incentivos fiscais para empresas em Pernambuco'
            },
            {
                'name': 'PRODEAUTO', 
                'display_name': 'Programa de Desenvolvimento Automotivo',
                'description': 'Incentivos para o setor automotivo'
            },
            {
                'name': 'PROIND',
                'display_name': 'Programa de Desenvolvimento Industrial', 
                'description': 'Incentivos para desenvolvimento industrial'
            }
        ]
        
        for program_data in programs_data:
            program, created = Program.objects.get_or_create(
                name=program_data['name'],
                defaults=program_data
            )
            if created:
                self.stdout.write(f'✅ Programa {program.name} criado')
            else:
                self.stdout.write(f'⚠️ Programa {program.name} já existe')

        # Criar trilhas de exemplo
        self.stdout.write('Criando trilhas...')
        
        trails_data = [
            # PRODEPE
            {'program': 'PRODEPE', 'title': 'Introdução ao PRODEPE', 'slug': 'prodepe-introducao', 
             'page_url': '/trilhas/prodepe/introducao', 'order': 1},
            {'program': 'PRODEPE', 'title': 'Benefícios do PRODEPE', 'slug': 'prodepe-beneficios',
             'page_url': '/trilhas/prodepe/beneficios', 'order': 2},
            {'program': 'PRODEPE', 'title': 'Requisitos PRODEPE', 'slug': 'prodepe-requisitos',
             'page_url': '/trilhas/prodepe/requisitos', 'order': 3},
            {'program': 'PRODEPE', 'title': 'Processo PRODEPE', 'slug': 'prodepe-processo',
             'page_url': '/trilhas/prodepe/processo', 'order': 4},
             
            # PRODEAUTO
            {'program': 'PRODEAUTO', 'title': 'Introdução ao PRODEAUTO', 'slug': 'prodeauto-introducao',
             'page_url': '/trilhas/prodeauto/introducao', 'order': 1},
            {'program': 'PRODEAUTO', 'title': 'Benefícios do PRODEAUTO', 'slug': 'prodeauto-beneficios',
             'page_url': '/trilhas/prodeauto/beneficios', 'order': 2},
            {'program': 'PRODEAUTO', 'title': 'Requisitos PRODEAUTO', 'slug': 'prodeauto-requisitos',
             'page_url': '/trilhas/prodeauto/requisitos', 'order': 3},
            {'program': 'PRODEAUTO', 'title': 'Processo PRODEAUTO', 'slug': 'prodeauto-processo',
             'page_url': '/trilhas/prodeauto/processo', 'order': 4},
             
            # PROIND
            {'program': 'PROIND', 'title': 'Introdução ao PROIND', 'slug': 'proind-introducao',
             'page_url': '/trilhas/proind/introducao', 'order': 1},
            {'program': 'PROIND', 'title': 'Benefícios do PROIND', 'slug': 'proind-beneficios',
             'page_url': '/trilhas/proind/beneficios', 'order': 2},
            {'program': 'PROIND', 'title': 'Requisitos PROIND', 'slug': 'proind-requisitos',
             'page_url': '/trilhas/proind/requisitos', 'order': 3},
            {'program': 'PROIND', 'title': 'Processo PROIND', 'slug': 'proind-processo',
             'page_url': '/trilhas/proind/processo', 'order': 4},
        ]
        
        for trail_data in trails_data:
            program = Program.objects.get(name=trail_data['program'])
            trail, created = Trail.objects.get_or_create(
                slug=trail_data['slug'],
                defaults={
                    'program': program,
                    'title': trail_data['title'],
                    'page_url': trail_data['page_url'],
                    'order': trail_data['order'],
                    'description': f"Trilha sobre {trail_data['title']}",
                    'estimated_duration': timedelta(minutes=30),
                    'difficulty_level': 1
                }
            )
            if created:
                self.stdout.write(f'✅ Trilha {trail.title} criada')
            else:
                self.stdout.write(f'⚠️ Trilha {trail.title} já existe')

        # Criar badges básicos
        self.stdout.write('Criando badges...')
        
        badges_data = [
            {
                'name': 'Primeiro Passo',
                'slug': 'primeiro-passo',
                'description': 'Concluiu sua primeira trilha',
                'category': 'PROGRESS',
                'required_trails_count': 1
            },
            {
                'name': 'DESBRAVADOR',
                'slug': 'desbravador', 
                'description': 'Concluiu 5 trilhas',
                'category': 'EXPLORATION',
                'required_trails_count': 5
            },
            {
                'name': 'Master PRODEPE',
                'slug': 'master-prodepe',
                'description': 'Concluiu todas as trilhas do PRODEPE',
                'category': 'COMPLETION'
            },
            {
                'name': 'Master PRODEAUTO', 
                'slug': 'master-prodeauto',
                'description': 'Concluiu todas as trilhas do PRODEAUTO',
                'category': 'COMPLETION'
            },
            {
                'name': 'Master PROIND',
                'slug': 'master-proind', 
                'description': 'Concluiu todas as trilhas do PROIND',
                'category': 'COMPLETION'
            }
        ]
        
        for badge_data in badges_data:
            badge, created = BadgeType.objects.get_or_create(
                slug=badge_data['slug'],
                defaults=badge_data
            )
            if created:
                self.stdout.write(f'✅ Badge {badge.name} criado')
            else:
                self.stdout.write(f'⚠️ Badge {badge.name} já existe')

        self.stdout.write(self.style.SUCCESS('✅ Setup completo!'))
        self.stdout.write('⚠️ Não esqueça de:')
        self.stdout.write('   1. Ajustar as URLs das trilhas no admin')
        self.stdout.write('   2. Fazer upload das imagens dos badges')
        self.stdout.write('   3. Configurar MEDIA_URL no settings.py')
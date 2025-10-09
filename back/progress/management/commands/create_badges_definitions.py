from django.core.management.base import BaseCommand
from progress.models import BadgeDefinition, DifficultyLevel, BadgeType

class Command(BaseCommand):
    help = 'Cria todas as definições de badges do sistema com imagens'

    def add_arguments(self, parser):
        parser.add_argument(
            '--list-files',
            action='store_true',
            help='Lista apenas os arquivos de imagem necessários'
        )

    def handle(self, *args, **options):
        if options['list_files']:
            self.list_required_files()
            return
        
        programs = ['PROIND', 'PRODEPE', 'PRODEAUTO']
        trails = [1, 2, 3, 4]
        difficulties = [
            ('EASY', 'BRONZE', 'Fácil'),
            ('MEDIUM', 'SILVER', 'Médio'), 
            ('HARD', 'GOLD', 'Difícil')
        ]

        created_count = 0
        self.stdout.write("🎯 Criando definições de badges...")
        self.stdout.write("=" * 50)
        
        for program in programs:
            self.stdout.write(f"\n📚 Programa: {program}")
            for trail in trails:
                for difficulty, badge_type, level_name in difficulties:
                    # Gerar caminho da imagem
                    badge_image_path = f"badges/{program.lower()}_t{trail}_{badge_type.lower()}.png"
                    
                    badge_def, created = BadgeDefinition.objects.get_or_create(
                        program=program,
                        trail_number=trail,
                        difficulty=difficulty,
                        defaults={
                            'name': f'{program} T{trail} - {level_name}',
                            'description': f'Badge conquistado ao completar o desafio {level_name.lower()} da trilha {trail} do programa {program}',
                            'badge_type': badge_type,
                            'badge_image': badge_image_path
                        }
                    )
                    if created:
                        created_count += 1
                        self.stdout.write(f"  ✅ {badge_def.name} -> {badge_image_path}")
                    else:
                        self.stdout.write(f"  ⏭️  {badge_def.name} (já existe)")

        self.stdout.write(
            self.style.SUCCESS(
                f'\n🎉 Resumo: {created_count} badges criados. Total no sistema: {BadgeDefinition.objects.count()}/36'
            )
        )
        
        if created_count > 0:
            self.stdout.write(
                self.style.WARNING(
                    '\n📁 Certifique-se de que as imagens estão na pasta media/badges/ com os nomes corretos!'
                )
            )

    def list_required_files(self):
        """Lista todos os arquivos de imagem necessários"""
        programs = ['PROIND', 'PRODEPE', 'PRODEAUTO']
        trails = [1, 2, 3, 4]
        badge_types = ['bronze', 'silver', 'gold']
        
        self.stdout.write("📁 Arquivos de badge necessários:")
        self.stdout.write("=" * 50)
        
        for program in programs:
            self.stdout.write(f"\n{program}:")
            for trail in trails:
                for badge_type in badge_types:
                    filename = f"  badges/{program.lower()}_t{trail}_{badge_type}.png"
                    self.stdout.write(filename)
        
        total_files = len(programs) * len(trails) * len(badge_types)
        self.stdout.write(f"\n📊 Total: {total_files} arquivos necessários")
        self.stdout.write("\n💡 Para criar os badges: python manage.py create_badge_definitions")
from django.core.management.base import BaseCommand
from progress.models import BadgeDefinition, DifficultyLevel, BadgeType, generate_standardized_badge_name

class Command(BaseCommand):
    help = 'Cria todas as definições de badges do sistema com nomes padronizados'

    def add_arguments(self, parser):
        parser.add_argument(
            '--list-files',
            action='store_true',
            help='Lista apenas os arquivos de imagem necessários'
        )
        parser.add_argument(
            '--update-existing',
            action='store_true',
            help='Atualiza badges existentes para novo formato de nome'
        )

    def handle(self, *args, **options):
        if options['list_files']:
            self.list_required_files()
            return
            
        if options['update_existing']:
            self.update_existing_badges()
            return
        
        programs = ['PROIND', 'PRODEPE', 'PRODEAUTO']
        trails = [1, 2, 3, 4]
        difficulties = [
            ('EASY', 'BRONZE'),
            ('MEDIUM', 'SILVER'), 
            ('HARD', 'GOLD')
        ]

        created_count = 0
        updated_count = 0
        self.stdout.write("🎯 Criando definições de badges com nomes padronizados...")
        self.stdout.write("=" * 60)
        
        for program in programs:
            self.stdout.write(f"\n📚 Programa: {program}")
            for trail in trails:
                for difficulty, badge_type in difficulties:
                    standardized_name = generate_standardized_badge_name(program, trail, difficulty)
                    
                    badge_image_path = f"badges/{program.lower()}_t{trail}_{badge_type.lower()}.png"
                    
                    badge_def, created = BadgeDefinition.objects.get_or_create(
                        program=program,
                        trail_number=trail,
                        difficulty=difficulty,
                        defaults={
                            'description': f'Badge conquistado ao completar desafio de {standardized_name.split(" - ")[1]} no nível {difficulty.lower()}',
                            'badge_type': badge_type,
                            'badge_image': badge_image_path
                        }
                    )
                    
                    if created:
                        created_count += 1
                        self.stdout.write(f"  ✅ {badge_def.name}")
                        self.stdout.write(f"     -> {badge_image_path}")
                    else:
                        if badge_def.name != standardized_name:
                            old_name = badge_def.name
                            badge_def.save() 
                            updated_count += 1
                            self.stdout.write(f"  🔄 {old_name}")
                            self.stdout.write(f"     -> {badge_def.name}")
                        else:
                            self.stdout.write(f"  ⏭️  {badge_def.name} (já existe)")

        self.stdout.write("=" * 60)
        self.stdout.write(
            self.style.SUCCESS(
                f'🎉 Resumo:'
            )
        )
        self.stdout.write(f"   • {created_count} badges criados")
        self.stdout.write(f"   • {updated_count} badges atualizados")
        self.stdout.write(f"   • Total no sistema: {BadgeDefinition.objects.count()}/36")
        
        if created_count > 0:
            self.stdout.write(
                self.style.WARNING(
                    '\n📁 Certifique-se de que as imagens estão na pasta media/badges/'
                )
            )

    def update_existing_badges(self):
        """Atualiza badges existentes para novo formato"""
        self.stdout.write("🔄 Atualizando badges existentes para nomes padronizados...")
        self.stdout.write("=" * 60)
        
        badges = BadgeDefinition.objects.all()
        updated_count = 0
        
        for badge in badges:
            old_name = badge.name
            new_name = generate_standardized_badge_name(
                badge.program, 
                badge.trail_number, 
                badge.difficulty
            )
            
            if old_name != new_name:
                badge.save() 
                updated_count += 1
                self.stdout.write(f"✅ {old_name}")
                self.stdout.write(f"   -> {new_name}")
            else:
                self.stdout.write(f"⏭️  {old_name} (já no formato correto)")
        
        self.stdout.write(
            self.style.SUCCESS(f'\n🎉 {updated_count} badges atualizados para novo formato!')
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
        self.stdout.write("\n💡 Comandos:")
        self.stdout.write("   python manage.py create_badge_definitions")
        self.stdout.write("   python manage.py create_badge_definitions --update-existing")
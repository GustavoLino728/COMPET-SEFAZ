from django.core.management.base import BaseCommand
from questions.models import Question, Option


class Command(BaseCommand):
    help = 'Seed the database with sample questions'

    def handle(self, *args, **options):
        self.stdout.write('🌱 Seeding questions...')
        
        # Sample questions data
        questions_data = [
            {
                'topic': 'ICMS',
                'question_text': 'O que é ICMS?',
                'explanation': 'ICMS é um imposto estadual sobre a circulação de bens e serviços.',
                'difficulty': 'EASY',
                'confidence_score': 0.9,
                'avg_similarity_score': 0.85,
                'options': [
                    {'option_text': 'Imposto sobre a renda federal', 'is_correct': False},
                    {'option_text': 'Imposto estadual sobre a circulação de bens', 'is_correct': True},
                    {'option_text': 'Imposto municipal sobre propriedade', 'is_correct': False},
                    {'option_text': 'Contribuição previdenciária', 'is_correct': False},
                    {'option_text': 'Imposto sobre importação', 'is_correct': False},
                ]
            },
            {
                'topic': 'Incentivos fiscais',
                'question_text': 'Qual programa oferece incentivos fiscais para a indústria automotiva no Pernambuco?',
                'explanation': 'PRODEAUTO é o programa que oferece incentivos fiscais para a indústria automotiva no Pernambuco.',
                'difficulty': 'MEDIUM',
                'confidence_score': 0.8,
                'avg_similarity_score': 0.75,
                'options': [
                    {'option_text': 'PRODEPE', 'is_correct': False},
                    {'option_text': 'PRODEAUTO', 'is_correct': True},
                    {'option_text': 'PEAP', 'is_correct': False},
                    {'option_text': 'FEFF', 'is_correct': False},
                    {'option_text': 'PROINFRA', 'is_correct': False},
                ]
            },
            {
                'topic': 'Não cumulatividade',
                'question_text': 'O que é a não cumulatividade no ICMS?',
                'explanation': 'A não cumulatividade significa que o ICMS pago em etapas anteriores pode ser creditado contra o ICMS devido em etapas subsequentes.',
                'difficulty': 'HARD',
                'confidence_score': 0.7,
                'avg_similarity_score': 0.65,
                'options': [
                    {'option_text': 'Exenção de impostos para todas as etapas', 'is_correct': False},
                    {'option_text': 'Crédito para impostos pagos em etapas anteriores', 'is_correct': True},
                    {'option_text': 'Proibição de dupla tributação', 'is_correct': False},
                    {'option_text': 'Redução de taxa de imposto', 'is_correct': False},
                    {'option_text': 'Mecanismo de adiamento de impostos', 'is_correct': False},
                ]
            }
        ]
        
        # Create questions
        for question_data in questions_data:
            options_data = question_data.pop('options')
            question = Question.objects.create(**question_data)
            
            for option_data in options_data:
                Option.objects.create(question=question, **option_data)
            
            self.stdout.write(f'✅ Created question: {question.topic}')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully seeded {len(questions_data)} questions!')
        )
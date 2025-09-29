import json
from django.core.management.base import BaseCommand
from django.db import transaction
from questions.models import Program, Track, Challenge, Source, ProblemQuestion, MultipleChoiceQuestion, Question

class Command(BaseCommand):
    help = 'Seeds the database with initial data for programs, tracks, and challenges.'

    def handle(self, *args, **options):
        self.stdout.write('Starting to seed the database...')

        json_data = {
            "challenges": [
                {
                    "challenge": "Uma empresa farmacoquímica localizada no Polo Farmacoquímico da Zona da Mata Norte do Estado de Pernambuco realizou uma venda de produtos químicos no valor de R$ 100.000,00. De acordo com a legislação do Proind, a empresa tem direito a um crédito presumido de ICMS de 12% sobre o total das vendas. Calcule o valor do crédito presumido que a empresa pode utilizar.",
                    "challenge_answer": "12000.00",
                    "challenge_justification": "O crédito presumido do Proind é calculado aplicando-se a alíquota de 12% sobre o valor das vendas, que no caso é R$ 100.000,00. O cálculo é feito da seguinte forma: R$ 100.000,00 x 12% = R$ 12.000,00. Portanto, a empresa pode utilizar um crédito presumido de R$ 12.000,00."
                },
                {
                    "challenge": "Uma empresa do setor farmacoquímico, situada no Polo Farmacoquímico, teve um saldo devedor de ICMS de R$ 50.000,00 após a aplicação do crédito presumido. Considerando que a empresa não pode aplicar o crédito presumido sobre a saída de combustíveis e energia elétrica, e que R$ 10.000,00 do saldo devedor decorre da saída de combustíveis, calcule o novo saldo devedor após a dedução do crédito presumido.",
                    "challenge_answer": "40000.00",
                    "challenge_justification": "O saldo devedor original é de R$ 50.000,00. A parte do saldo devedor que não pode ser coberta pelo crédito presumido, devido às saídas de combustíveis, é de R$ 10.000,00. Portanto, ao subtrair esse valor do saldo devedor: R$ 50.000,00 - R$ 10.000,00 = R$ 40.000,00. Assim, o novo saldo devedor é de R$ 40.000,00."
                }
            ],
            "questions": [
                {
                    "question": "Qual é a principal finalidade do Programa Proind?",
                    "options": {
                        "A": "Promover a exportação de produtos.",
                        "B": "Atraír e fomentar investimentos no setor industrial.",
                        "C": "Regularizar a situação tributária das empresas.",
                        "D": "Conceder isenção total de impostos.",
                        "E": "Aumentar o consumo interno de produtos."
                    },
                    "correct_answer": "B",
                    "question_justification": "O Programa Proind tem como principal finalidade atrair e fomentar investimentos no setor industrial, oferecendo incentivos fiscais para empresas que se enquadram nas suas diretrizes."
                },
                {
                    "question": "Sobre o crédito presumido do Proind, qual das seguintes mercadorias não é elegível para a aplicação do crédito?",
                    "options": {
                        "A": "Produtos químicos.",
                        "B": "Equipamentos industriais.",
                        "C": "Combustíveis.",
                        "D": "Insumos farmacêuticos.",
                        "E": "Matérias-primas."
                    },
                    "correct_answer": "C",
                    "question_justification": "De acordo com a legislação, o crédito presumido do Proind não se aplica à saída de combustíveis, tornando esta mercadoria inelegível para o benefício."
                },
                {
                    "question": "Qual é um dos requisitos para que uma empresa possa se beneficiar do Proind?",
                    "options": {
                        "A": "Ser uma microempresa.",
                        "B": "Estar localizada em qualquer município de Pernambuco.",
                        "C": "Ter atividade econômica principal de indústria.",
                        "D": "Possuir um capital social mínimo de R$ 1.000.000,00.",
                        "E": "Não operar no setor de serviços."
                    },
                    "correct_answer": "C",
                    "question_justification": "Um dos requisitos estabelecidos para que uma empresa possa se beneficiar do Proind é que ela tenha como atividade econômica principal a indústria."
                },
                {
                    "question": "Qual documento a empresa deve emitir para a transferência de saldo credor no Proind?",
                    "options": {
                        "A": "Nota Fiscal de Entrada.",
                        "B": "Nota Fiscal de Saída.",
                        "C": "Recibo de Transferência.",
                        "D": "Declaração de Saldo Credor.",
                        "E": "Nota de Débito."
                    },
                    "correct_answer": "B",
                    "question_justification": "Para a transferência de saldo credor, a empresa deve emitir uma Nota Fiscal de Saída com o item 'transferência de saldo credor - Prodeauto'."
                },
                {
                    "question": "Qual é a alíquota aplicada ao crédito presumido do Proind?",
                    "options": {
                        "A": "5%",
                        "B": "7%",
                        "C": "10%",
                        "D": "12%",
                        "E": "15%"
                    },
                    "correct_answer": "D",
                    "question_justification": "A alíquota aplicada ao crédito presumido do Proind é de 12%, conforme especificado na legislação tributária pertinente."
                }
            ],
            "sources": [
                {
                    "file_name": "Decreto 44.650.2017 - Anexo 33.pdf"
                },
                {
                    "file_name": "Decreto 44.650 - Anexo 36.pdf"
                },
                {
                    "file_name": "Lei 13.484.pdf"
                }
            ]
        }
        
        try:
            with transaction.atomic():
                # Clean up existing data to avoid duplicates
                Program.objects.all().delete()
                Track.objects.all().delete()
                Source.objects.all().delete()
                Challenge.objects.all().delete()
                ProblemQuestion.objects.all().delete()
                MultipleChoiceQuestion.objects.all().delete()

                self.stdout.write('Creating Program, Track, and Challenge...')
                program, _ = Program.objects.get_or_create(name='PROIND')
                track, _ = Track.objects.get_or_create(program=program, name='Incentivos Fiscais')
                
                # Create a single challenge to hold all questions
                challenge, _ = Challenge.objects.get_or_create(
                    track=track,
                    title='Desafio sobre PROIND',
                    difficulty=Question.Difficulty.MEDIUM
                )

                self.stdout.write('Creating Sources...')
                source_objects = []
                for source_data in json_data['sources']:
                    source, _ = Source.objects.get_or_create(file_name=source_data['file_name'])
                    source_objects.append(source)
                
                challenge.sources.add(*source_objects)
                
                self.stdout.write('Creating Problem Questions...')
                for pq_data in json_data['challenges']:
                    ProblemQuestion.objects.create(
                        challenge=challenge,
                        statement=pq_data['challenge'],
                        correct_answer=pq_data['challenge_answer'],
                        justification=pq_data['challenge_justification']
                    )
                
                self.stdout.write('Creating Multiple Choice Questions...')
                for mcq_data in json_data['questions']:
                    MultipleChoiceQuestion.objects.create(
                        challenge=challenge,
                        statement=mcq_data['question'],
                        option_a=mcq_data['options']['A'],
                        option_b=mcq_data['options']['B'],
                        option_c=mcq_data['options']['C'],
                        option_d=mcq_data['options']['D'],
                        option_e=mcq_data['options']['E'],
                        correct_option=mcq_data['correct_answer'],
                        justification=mcq_data['question_justification']
                    )

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {e}'))
            return

        self.stdout.write(self.style.SUCCESS('Database has been successfully seeded.'))

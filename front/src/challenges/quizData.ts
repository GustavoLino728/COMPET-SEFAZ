// Você pode ter este tipo em um arquivo src/types/index.ts
import { QuizQuestion } from "../types";

export const quizDesafio1: QuizQuestion[] = [
    {
        id: 1,
        type: 'multiple-choice',
        question: 'Um estabelecimento industrial localizado na Mesorregião da Mata Pernambucana tem direito a qual percentual máximo de crédito presumido do PROIND sobre o saldo devedor do ICMS?',
        options: ['75%', '85%', '90%', '95%'],
        correctAnswerIndex: 1,
        justification: 'Conforme o Art. 2º, inciso II, do Anexo 33 do Decreto 44.650/2017, o percentual de crédito presumido para estabelecimentos industriais localizados na Mesorregião da Mata Pernambucana é de 85% sobre o saldo devedor apurado.'
    },
    {
        id: 2,
        type: 'multiple-choice',
        question: 'O benefício de crédito presumido do PROIND se aplica sobre a parcela do imposto correspondente às saídas de produtos que não tenham sido fabricados pelo próprio estabelecimento incentivado (operações de revenda)?',
        options: [
            'Sim, aplica-se a todas as saídas, sem distinção.',
            'Sim, desde que as mercadorias revendidas sejam de origem nacional.',
            'Não, o benefício é restrito às saídas de produtos de fabricação própria.',
            'Sim, mas com um percentual de crédito reduzido a 50%.',
            'Não, exceto se a mercadoria for revendida para outro estado.'
        ],
        correctAnswerIndex: 2,
        justification: 'O incentivo do PROIND é aplicável exclusivamente sobre o saldo devedor do ICMS apurado na saída de produtos fabricados pelo próprio estabelecimento, focando o incentivo na produção industrial local.'
    },
    {
        id: 3,
        type: 'essay',
        question: 'Uma empresa industrial, localizada no Agreste Pernambucano, é beneficiária do PROIND. No mês de referência, a empresa realiza diversas operações de venda e precisa apurar o ICMS a recolher, utilizando o crédito presumido concedido pelo programa. Além disso, a empresa enfrenta questões sobre a utilização indevida do benefício e as consequências legais. O gestor da empresa busca entender as regras de homologação do benefício, as penalidades aplicáveis em caso de glosa e as condições sob as quais a utilização do crédito é considerada indevida. Descreva em detalhes as disposições do PROIND aplicáveis a esta situação, considerando as responsabilidades do contribuinte e os procedimentos da SEFAZ, conforme o Decreto 44.650/2017 - Anexo 33.',
        justification: 'Conforme o Decreto 44.650/2017 - Anexo 33, o recolhimento com o benefício está sujeito à homologação posterior pela SEFAZ. A utilização indevida resulta na glosa parcial ou total do crédito e na aplicação de penalidades (multa, juros). O § 3º do Artigo 7º oferece uma "porta de saída", isentando o contribuinte das penalidades se ele regularizar a situação antes da fiscalização.'
    },
    {
        id: 4,
        type: 'multiple-choice',
        question: 'A utilização indevida do crédito presumido do PROIND pode resultar na aplicação de:',
        options: [
            'Multa, juros e atualização monetária.',
            'Apenas glosa do benefício',
            'Apenas multa.',
            'Multa e suspensão do benefício.',
            'Apenas juros.'
        ],
        correctAnswerIndex: 0,
        justification: 'Conforme o artigo 22 do Decreto 44.650/2017 - Anexo 33, a utilização indevida do benefício sujeita o contribuinte à glosa parcial ou total do crédito presumido e à aplicação de multa, juros e atualização monetária.'
    },
    {
        id: 5,
        type: 'multiple-choice',
        question: 'Em qual região do estado de Pernambuco um estabelecimento industrial pode usufruir de um crédito presumido de até 90% sobre o saldo devedor do ICMS?',
        options: [
            'Sertão Pernambucano',
            'Mata Pernambucana',
            'Agreste Pernambucano',
            'Região Metropolitana do Recife',
            'São Francisco Pernambucano'
        ],
        correctAnswerIndex: 2,
        justification: 'De acordo com o Artigo 2º, inciso II, do Anexo 33 do Decreto 44.650/2017, o percentual máximo de crédito presumido é de 90% para estabelecimentos localizados na Mesorregião do Agreste Pernambucano.'
    }
];
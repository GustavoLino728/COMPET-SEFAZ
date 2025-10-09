import { Challenge } from '../types'; // Verifique se o caminho para seu arquivo de tipos está correto

// Adicione "export" aqui
export const basicChallenges: Challenge[] = [
  { id: 1, title: 'Desafio 1', questions: 5, description: 'Aplique os conceitos do PROIND em uma situação prática, calculando o percentual de incentivo, o saldo devedor e a contribuição ao FEEF.' },
  { id: 2, title: 'Desafio 2', questions: 5, description: 'Explore o conceito de subapuração dentro do PROIND, entendendo como separar operações e calcular o incentivo de forma segmentada em diferentes cenários.' }
];

// E aqui
export const intermediateChallenges: Challenge[] = [
  { id: 3, title: 'Desafio 3', questions: 8, description: 'Analise um caso de importação com diferimento de ICMS e calcule o crédito presumido aplicável, considerando as vedações da legislação.' },
  { id: 4, title: 'Desafio 4', questions: 10, description: 'Simule a apuração de uma empresa industrial que também realiza vendas no varejo, segregando as bases de cálculo e aplicando os benefícios corretamente.' }
];

// E aqui também
export const advancedChallenges: Challenge[] = [
  { id: 5, title: 'Desafio 5', questions: 10, description: 'Resolva um estudo de caso complexo envolvendo a transferência de mercadorias entre matriz e filial, uma com PROIND e outra não, otimizando a carga tributária.' },
  { id: 6, title: 'Desafio 6', questions: 12, description: 'Elabore um planejamento tributário para uma empresa em expansão, decidindo entre PRODEPE e PROIND com base em projeções de faturamento e custos.' }
];
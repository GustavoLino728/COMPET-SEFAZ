export type Trilha = {
  id: string;
  programa: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  titulo: string;
  descricaoHeader: string;
  sobreTrilha: string;
  urlVideo: string;
  blocosDeConteudo: {
    tipo: 'subtitulo' | 'paragrafo';
    conteudo: string;
  }[];
  
};

export const trilhas: Trilha[] = [
  {
    id: 'proind-calculo-incentivo',
    programa: 'PROIND',
    titulo: 'T1: Cálculo do Incentivo',
    descricaoHeader: 'Conheça os fundamentos do PROIND e como ele pode transformar sua carreira.',
    sobreTrilha: 'Aqui você vai aprender como calcular o incentivo fiscal do PROIND, entendendo o que é o crédito presumido, como aplicá-lo e registrá-lo corretamente. Ao final, estará capacitado a identificar operações elegíveis, realizar cálculos precisos e compreender as regras para manter o benefício.',
    urlVideo: '',
    blocosDeConteudo: [
      {
        tipo: 'subtitulo',
        conteudo: 'Conteúdo da Trilha de Introdução ao PROIND'
      },
      {
        tipo: 'paragrafo',
        conteudo: '1. Introdução e Contextualização do Tema: O Programa de Estímulo à Indústria do Estado de Pernambuco, conhecido como PROIND, foi criado com o propósito primordial de impulsionar o desenvolvimento econômico, a geração de empregos e a competitividade do setor industrial pernambucano. Seu principal mecanismo de fomento é a concessão de crédito presumido de ICMS, que atua como um redutor direto do imposto normal devido pelas empresas. Este incentivo se insere na realidade fiscal como uma ferramenta estratégica para aliviar a carga tributária, incentivando a permanência, a expansão e a atração de novas indústrias para o estado, promovendo assim o desenvolvimento regional equilibrado. O PROIND é regido principalmente pelo Decreto nº 44.650/2017, especificamente em seu Anexo 33, que detalha as condições e a metodologia de cálculo.'
      },
      
      {
        tipo: 'paragrafo',
        conteudo: 'Este é o segundo parágrafo da sua trilha, explicando mais detalhes.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Este é o terceiro parágrafo...'
      },
      // etc...
    ]
  },

  // ...aqui viria a sua próxima trilha, também com um 'blocosDeConteudo'
];


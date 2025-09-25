export type Trilha = {
  id: string;
  programa: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  titulo: string;
  descricaoHeader: string;
  sobreTrilha: string;
  urlVideo: string;
  blocosDeConteudo: {
    tipo: 'subtitulo' | 'subtitulo-bold' | 'paragrafo' | 'lista' | 'lista-alfabetica'; 
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
        tipo: 'subtitulo-bold',
        conteudo: '1. Introdução e Contextualização do Tema:' 
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O Programa de Estímulo à Indústria do Estado de Pernambuco, conhecido como PROIND, foi criado com o propósito primordial de impulsionar o desenvolvimento econômico, a geração de empregos e a competitividade do setor industrial pernambucano. Seu principal mecanismo de fomento é a concessão de crédito presumido de ICMS, que atua como um redutor direto do imposto normal devido pelas empresas. Este incentivo se insere na realidade fiscal como uma ferramenta estratégica para aliviar a carga tributária, incentivando a permanência, a expansão e a atração de novas indústrias para o estado, promovendo assim o desenvolvimento regional equilibrado. O PROIND é regido principalmente pelo Decreto nº 44.650/2017, especificamente em seu Anexo 33, que detalha as condições e a metodologia de cálculo.'

      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Percentuais Aplicáveis ao Crédito Presumido'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O valor do crédito presumido do PROIND é determinado pela aplicação de percentuais específicos sobre o saldo devedor do ICMS apurado no período fiscal. Estes percentuais variam significativamente conforme a localização geográfica do estabelecimento industrial ou a sua atividade econômica principal, refletindo a política de desenvolvimento regional do Estado.'

      },
      {
        tipo: 'lista-alfabetica',
        conteudo: 'A - Mesorregião Metropolitana do Recife: O percentual máximo aplicável é de 75% (conforme Art. 2º, inciso I, do Anexo 33). Esta alíquota visa manter a competitividade das indústrias já estabelecidas na capital e região adjacente. B - Mesorregiões da Mata Pernambucana, Agreste Pernambucano, Sertão Pernambucano ou São Francisco Pernambucano: Para essas regiões, os percentuais são mais elevados, podendo atingir 85%, 90% e 95% (conforme Art. 2º, inciso II, do Anexo 33). Essa diferenciação busca estimular a descentralização industrial e o desenvolvimento de regiões com menor índice de industrialização, combatendo as disparidades regionais. C - Atividades Industriais Específicas: Independentemente da sua localização, certas atividades industriais estratégicas usufruem do percentual de 95% (conforme Art. 2º, inciso III, do Anexo 33). Incluem-se aqui indústrias siderúrgicas, produtoras de laminados de alumínio a quente ou fabricantes de vidros planos. A empresa farmacoquímica localizada no Polo Farmacoquímico e de Química Fina da Zona da Mata Norte do Estado também se enquadra nesta última categoria, reconhecendo a importância estratégica desse setor.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'É crucial que a empresa identifique corretamente sua localização e atividade para aplicar o percentual adequado, garantindo a conformidade e maximizando o benefício.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3.  Base de Cálculo do Incentivo e Inaplicabilidades'
      },
      {
        tipo: 'paragrafo',
        conteudo:'A base de cálculo do crédito presumido do PROIND é o saldo devedor do ICMS apurado no período fiscal (resultado do ICMS de saída menos o ICMS de entrada). Contudo, é fundamental compreender quais operações não são abrangidas por este benefício para uma correta apuração e evitar glosas fiscais.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Este incentivo não se aplica ao saldo devedor proveniente da saída de determinadas mercadorias, as quais possuem regimes tributários específicos ou são consideradas essenciais, como:'
      },
      {
        tipo: 'lista',
        conteudo: 'a. Combustíveis; b. Energia elétrica; c. Açúcar; d. Álcool; e. Cerâmica vermelha; f. Água mineral natural; g. Brita. Essas exclusões garantem que o benefício seja direcionado às operações industriais específicas que o programa visa fomentar, evitando distorções ou sobreposições com outros regimes fiscais.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Adicionalmente, o crédito presumido não pode ser utilizado sobre o saldo devedor de mercadorias que foram:'
      },

      {
        tipo: 'lista',
        conteudo: 'A - Adquiridas de terceiros sem que tenham sofrido processo de industrialização substancial no estabelecimento beneficiário; B - O processo de industrialização, mesmo que parcial, ocorreu em outro estado. Há uma ressalva importante para operações de beneficiamento ou acondicionamento, desde que sejam atividades complementares a um processo de transformação ou montagem realizado no estabelecimento beneficiário. Isso significa que o PROIND visa incentivar a agregação de valor dentro do estado de Pernambuco.'
      },
      {
        tipo: 'paragrafo',
        conteudo:'Por fim, o PROIND não é cumulativo com outros créditos presumidos ou benefícios fiscais que resultem em redução da carga tributária do ICMS, exceto o previsto no PROINFRA. Esta exceção é estratégica, pois o PROINFRA (Programa de Investimento em Infraestrutura) incentiva investimentos em infraestrutura, e sua cumulatividade com o PROIND visa promover tanto a industrialização quanto a melhoria da infraestrutura do estado. A segregação das operações incentivadas das não incentivadas é um pilar para a correta aplicação do benefício.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Metodologia de Cálculo e Apuração'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O cálculo efetivo do crédito presumido do PROIND exige precisão e a aplicação de uma metodologia proporcional. Ele se dá pela aplicação do percentual correspondente ao benefício sobre o saldo devedor do imposto. Contudo, essa aplicação é proporcional às saídas das mercadorias que são objeto do benefício em relação ao total das saídas realizadas no período fiscal. Isso significa que o cálculo não é direto sobre o saldo devedor total, mas sim sobre a parcela do ICMS que se relaciona diretamente com as operações incentivadas, garantindo que o benefício seja concedido apenas sobre o valor adicionado em Pernambuco.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Após a determinação do valor do crédito presumido, ele deve ser lançado como uma "dedução para investimentos" na apuração da EFD - ICMS/IPI. Para isso, utiliza-se o código de ajuste PE 040012 (ou outro que venha a substituí-lo, conforme normatizado pela Secretaria da Fazenda) no Registro E111, campo VL_AJ_DEB. Este lançamento reduz o valor do ICMS a recolher no período.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'É obrigatória a elaboração e manutenção de uma planilha demonstrativa detalhada do cálculo. Esta planilha deve conter todos os elementos que comprovem a correta apuração do benefício, incluindo:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: 'A - Saídas de mercadorias incentivadas; B - Saldo devedor total do ICMS; C - Cálculo da proporção das saídas incentivadas; D - Aplicação do percentual do PROIND; C - Valor final do crédito presumido. Esta documentação deve ser mantida pela empresa para eventual apresentação ao Fisco pelo prazo prescricional de 5 (cinco) anos, sendo fundamental para o compliance fiscal e para auditorias.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Exemplo Prático Detalhado: Considere uma indústria localizada na Mesorregião da Mata Pernambucana, beneficiária do PROIND, que apurou em determinado período fiscal os seguintes dados:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: 'Saldo Devedor Total de ICMS: R$ 100.000,00 Saídas de Mercadorias Objeto do Benefício Fiscal: R$ 80.000,00 Saídas de Mercadorias Não Abrangidas pelo PROIND: R$ 20.000,00 Total de Saídas no Período: R$ 100.000,00 (R$ 80.000,00 + R$ 20.000,00)'
      },

    ]
  },

  // ...aqui viria a sua próxima trilha, também com um 'blocosDeConteudo'
];


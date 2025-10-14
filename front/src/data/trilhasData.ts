export type ItemDaListaAninhada = string | {
  texto: string;
  subItens?: ItemDaListaAninhada[];
};

type BlocoSubtitulo = {
  tipo: 'subtitulo' | 'subtitulo-bold';
  conteudo: string;
};

type BlocoParagrafo = {
  tipo: 'paragrafo';
  conteudo: string;
};

type BlocoListaAninhada = {
  tipo: 'lista'; 
  conteudo: ItemDaListaAninhada[];
};

type BlocoListaSimples = {
  tipo: 'lista-alfabetica' | 'lista-bullet';
  conteudo: string[]; 
};

type BlocoDeConteudo = BlocoSubtitulo | BlocoParagrafo | BlocoListaAninhada | BlocoListaSimples;

export type Trilha = {
  id: string;
  programa: 'PROIND' | 'PRODEPE' | 'PRODEAUTO';
  titulo: string;
  descricaoHeader: string;
  sobreTrilha: string;
  urlVideo: string;
  blocosDeConteudo: BlocoDeConteudo[];
  materiaisComplementares?: {
  texto: string;
  url: string; }[];
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
        tipo: 'subtitulo-bold',
        conteudo: '1. Introdução e Contextualização do Tema' 
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
        conteudo: [
          'A - Mesorregião Metropolitana do Recife: O percentual máximo aplicável é de 75% (conforme Art. 2º, inciso I, do Anexo 33). Esta alíquota visa manter a competitividade das indústrias já estabelecidas na capital e região adjacente.', 
          'B - Mesorregiões da Mata Pernambucana, Agreste Pernambucano, Sertão Pernambucano ou São Francisco Pernambucano: Para essas regiões, os percentuais são mais elevados, podendo atingir 85%, 90% e 95% (conforme Art. 2º, inciso II, do Anexo 33). Essa diferenciação busca estimular a descentralização industrial e o desenvolvimento de regiões com menor índice de industrialização, combatendo as disparidades regionais.', 
          'C - Atividades Industriais Específicas: Independentemente da sua localização, certas atividades industriais estratégicas usufruem do percentual de 95% (conforme Art. 2º, inciso III, do Anexo 33). Incluem-se aqui indústrias siderúrgicas, produtoras de laminados de alumínio a quente ou fabricantes de vidros planos. A empresa farmacoquímica localizada no Polo Farmacoquímico e de Química Fina da Zona da Mata Norte do Estado também se enquadra nesta última categoria, reconhecendo a importância estratégica desse setor.'
        ]
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
        conteudo: [
          'a. Combustíveis;',
          'b. Energia elétrica;',
          'c. Açúcar;',
          'd. Álcool;',
          'e. Cerâmica vermelha;',
          'f. Água mineral natural;',
          'g. Brita.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Essas exclusões garantem que o benefício seja direcionado às operações industriais específicas que o programa visa fomentar, evitando distorções ou sobreposições com outros regimes fiscais.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Adicionalmente, o crédito presumido não pode ser utilizado sobre o saldo devedor de mercadorias que foram:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Adquiridas de terceiros sem que tenham sofrido processo de industrialização substancial no estabelecimento beneficiário;',
          'B - O processo de industrialização, mesmo que parcial, ocorreu em outro estado. Há uma ressalva importante para operações de beneficiamento ou acondicionamento, desde que sejam atividades complementares a um processo de transformação ou montagem realizado no estabelecimento beneficiário. Isso significa que o PROIND visa incentivar a agregação de valor dentro do estado de Pernambuco.'
        ]
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
        conteudo: [
          'A - Saídas de mercadorias incentivadas;',
          'B - Saldo devedor total do ICMS;',
          'C - Cálculo da proporção das saídas incentivadas;',
          'D - Aplicação do percentual do PROIND;',
          'E - Valor final do crédito presumido.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Esta documentação deve ser mantida pela empresa para eventual apresentação ao Fisco pelo prazo prescricional de 5 (cinco) anos, sendo fundamental para o compliance fiscal e para auditorias.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Exemplo Prático Detalhado: Considere uma indústria localizada na Mesorregião da Mata Pernambucana, beneficiária do PROIND, que apurou em determinado período fiscal os seguintes dados:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'a. Saldo Devedor Total de ICMS: R$ 100.000,00',
          'b. Saídas de Mercadorias Objeto do Benefício Fiscal: R$ 80.000,00',
          'c. Saídas de Mercadorias Não Abrangidas pelo PROIND: R$ 20.000,00',
          'd. Total de Saídas no Período: R$ 100.000,00 (R$ 80.000,00 + R$ 20.000,00)'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Passo a Passo do Cálculo:'
      },
      {
        tipo: 'lista',
        conteudo: [
          'Identificar o Percentual Aplicável: Para a Mesorregião da Mata Pernambucana, o percentual máximo é de 85%, conforme o Art. 2º, inciso II, do Anexo 33.',
          'Calcular a Proporção das Saídas Incentivadas:'
        ]
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'a - Proporção = (Saídas de Mercadorias Incentivadas) / (Total de Saídas no Período)',
          'b - Proporção = R$ 80.000,00 / R$ 100.000,00 = 0,80 (ou 80%)',
          'c - Esta proporção garante que o benefício incida apenas sobre a parcela do ICMS gerada pelas operações incentivadas.'
        ]
      },
      {
        tipo: 'lista',
        conteudo: [
          'Determinar a Base para o Cálculo do Crédito Presumido:'
        ]
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'a - Base = Saldo Devedor Total de ICMS × Proporção das Saídas Incentivadas',
          'b - Base = R$ 100.000,00 × 0,80 = R$ 80.000,00',
          'c - Observe que a base é o saldo devedor proporcionalizado às saídas incentivadas, e não o valor total do saldo devedor.'
        ]
      },
      {
        tipo: 'lista', 
        conteudo: [
          'Aplicar o Percentual do PROIND sobre a Base Calculada:'
        ]
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'a - Crédito Presumido = Base × Percentual Aplicável',
          'b - Crédito Presumido = R$ 80.000,00 × 0,85 = R$ 68.000,00'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O valor de R$68.000,00 é o crédito presumido a ser utilizado pela empresa. Este montante será lançado como dedução na EFD-ICMS/IPI com o código PE 040012, reduzindo o imposto a recolher de R$100.000,00 para R$32.000,00 (R$100.000,00 - R$68.000,00). A empresa deve manter uma planilha detalhada deste cálculo, reconciliada com seus registros contábeis, para fins de fiscalização e para demonstrar a conformidade com a legislação.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Referências Oficiais:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
        'A - Decreto 44.650.2017 - Anexo 33 (com as alterações mais recentes, como o Dec. 52.632/2022, que consolidou e atualizou diversas disposições). É fundamental consultar a versão mais atualizada da legislação.'
      ]
     }
    ],

    materiaisComplementares: [
      {
        texto: 'DO PROGRAMA DE ESTÍMULO À INDÚSTRIA DO ESTADO DE PERNAMBUCO - PROIND',
        url: 'https://drive.google.com/file/d/1tSY57GXSjpKXKDNoKElOnPfgERyyGsKV/view?usp=sharing'
      },
    ]

  },

{
    id: 'proind-lançamentos-incentivo',
    programa: 'PROIND',
    titulo: 'T2: Lançamentos do Incentivo',
    descricaoHeader: 'Conheça os fundamentos do PROIND e como ele pode transformar sua carreira.',
    sobreTrilha: 'Aqui você vai aprender como calcular o incentivo fiscal do PROIND, entendendo o que é o crédito presumido, como aplicá-lo e registrá-lo corretamente. Ao final, estará capacitado a identificar operações elegíveis, realizar cálculos precisos e compreender as regras para manter o benefício.',
    urlVideo: '',
    blocosDeConteudo: [
       {
        tipo: 'subtitulo-bold',
        conteudo: '1. Introdução e Contextualização do Tema'
        },
      {
        tipo: 'paragrafo',
        conteudo: 'A correta aplicação de um benefício fiscal como o PROIND não se resume apenas ao seu cálculo. É igualmente fundamental que os valores apurados sejam devidamente registrados e informados aos órgãos fiscalizadores. Os lançamentos do incentivo no sistema contábil e fiscal da empresa são passos essenciais para a validade da sua utilização, garantindo a transparência, a conformidade com as exigências da Secretaria da Fazenda de Pernambuco (SEFAZ-PE) e a segurança jurídica do contribuinte. Este processo assegura que o Fisco possa verificar a aplicação correta do benefício, evitando futuras autuações, glosas e penalidades, e confirmando a regularidade fiscal do contribuinte. Além de ser uma obrigação legal, a gestão precisa desses lançamentos é uma ferramenta estratégica de planejamento tributário, permitindo que a empresa visualize o impacto real do incentivo em seu fluxo de caixa e na sua competitividade.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Registro do Crédito Presumido na EFD-ICMS/IPI'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O valor do crédito presumido do PROIND, após ser devidamente calculado conforme a metodologia estabelecida, deve ser registrado na apuração do Imposto sobre Operações Relativas à Circulação de Mercadorias e sobre Prestações de Serviços de Transporte Interestadual e Intermunicipal e de Comunicação (ICMS), dentro da Escrituração Fiscal Digital (EFD-ICMS/IPI). Este lançamento é crucial para efetivar a dedução do imposto devido, refletindo a redução da carga tributária proporcionada pelo incentivo.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Especificamente, o valor calculado deve ser lançado como uma “dedução para investimentos” no registro de ajustes da apuração do ICMS. Essa classificação reflete a natureza do PROIND como um incentivo ao desenvolvimento econômico e ao investimento no estado. Para isso, o código padronizado a ser utilizado é o PE040012, ou qualquer outro código que venha a substituí-lo no futuro, de acordo com as normas estabelecidas pela Portaria SF nº 126, de 30 de agosto de 2018.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Dentro da EFD-ICMS/IPI, este lançamento ocorre no Bloco E, que trata da Apuração do ICMS e do IPI. Mais precisamente, no Registro E110 (Apuração do ICMS – Operações Próprias), onde o valor total do ICMS a recolher é consolidado. O ajuste em si é detalhado no Registro E111 (Ajuste/Benefício/Incentivo da Apuração do ICMS), utilizando os campos:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - COD_AJ_APUR: O código do ajuste, que será PE 040012.',
          'B - DESCR_COMPL_AJ: Uma descrição complementar opcional para o ajuste, como "Crédito Presumido PROIND - Decreto 44.650/2017".',
          'C - VL_AJ_APUR: O valor do crédito presumido a ser deduzido.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A inserção correta deste código e valor no sistema fiscal eletrônico da empresa é um requisito indispensável para a validação da utilização do incentivo perante o Fisco, pois é por meio da EFD que a SEFAZ-PE monitora a aplicação dos benefícios fiscais. A validação prévia da EFD-ICMS/IPI através do PVA (Programa Validador e Assinador) é uma etapa crítica para identificar possíveis erros de preenchimento antes da transmissão.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Manutenção de Planilhas Demonstrativas e Controles Internos'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Além do registro formal na EFD-ICMS/IPI, a legislação do PROIND exige que o contribuinte mantenha uma organização interna rigorosa e um robusto controle documental. É mandatório que a empresa elabore e preserve uma planilha detalhada que demonstre de forma clara e transparente todo o processo de cálculo do crédito presumido utilizado.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Essa planilha deve ser capaz de comprovar o valor apurado e todas as variáveis que levaram a ele, servindo como um verdadeiro "audit trail" para a fiscalização. Ela deve conter, no mínimo:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Identificação completa da empresa (CNPJ, Inscrição Estadual, Razão Social).',
          'B - Período de Apuração (mês/ano).',
          'C - Base Legal do Incentivo (Artigo e Anexo do Decreto 44.650/2017).',
          'D - Detalhamento da Receita Bruta Total e da Receita Bruta Incentivada (com referências a notas fiscais ou relatórios de vendas).',
          'E - Cálculo da Proporção das Saídas Incentivadas.',
          'F - Valor do Saldo Devedor de ICMS antes do incentivo.',
          'G - Percentual de crédito presumido aplicável à região/atividade.',
          'H - Cálculo final do Crédito Presumido do PROIND.',
          'I - Valor do ICMS a recolher após a dedução.',
          'J - Referências aos documentos fiscais e contábeis que embasam os valores (ex: livros fiscais, balancetes).'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Esta documentação deve ser arquivada pelo contribuinte durante todo o prazo prescricional, que é de cinco anos a contar do primeiro dia do exercício seguinte ao da ocorrência do fato gerador, e deve ser apresentada ao Fisco sempre que solicitada. A manutenção de controles internos robustos, com segregação de funções e reconciliações periódicas, é uma boa prática de governança que minimiza erros e fraudes, garantindo a integridade dos dados e a conformidade fiscal.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Implicações da Irregularidade nas Obrigações Acessórias'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A correta utilização do crédito presumido do PROIND está diretamente vinculada ao cumprimento das obrigações tributárias, tanto as principais (pagamento do imposto) quanto as acessórias (apresentação de declarações e documentos). A legislação prevê consequências severas para a não conformidade, que podem impactar diretamente o valor do incentivo a ser lançado.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A utilização do crédito presumido pode ser vedada (ou seja, o benefício é totalmente perdido para o período) em um período fiscal de apuração se, na data de vencimento do ICMS normal, o contribuinte não estiver regular quanto ao cumprimento de suas obrigações tributárias (principal ou acessórias). Para comprovar essa regularidade, é exigida a apresentação de certidão de regularidade fiscal (Certidão Negativa de Débitos - CND ou Certidão Positiva com Efeitos de Negativa - CPD-EN) emitida na referida data. Adicionalmente, caso haja infração à legislação tributária estadual que configure crime contra a ordem tributária (conforme Lei nº 8.137/90), o benefício também será vedado, sujeitando o contribuinte a sanções penais e administrativas.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Além disso, irregularidades na entrega de arquivos relativos aos livros fiscais eletrônicos (EFD-ICMS/IPI e eDoc) podem gerar a redução do valor do crédito presumido:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Redução de 10%: Se a irregularidade implicar em pagamento a menor do imposto, ou seja, se o erro no lançamento do incentivo ou na EFD-ICMS/IPI resultar em um valor de ICMS a recolher inferior ao devido.',
          'B - Redução de 2%: Se o erro for apenas no montante do crédito presumido utilizado, sem implicar em pagamento a menor do imposto devido, mas ainda assim houver inconsistência no registro do benefício.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Essas penalidades reforçam a necessidade de exatidão e pontualidade nos lançamentos e na transmissão das obrigações acessórias. O monitoramento contínuo da situação fiscal da empresa junto à SEFAZ-PE é fundamental para evitar surpresas e garantir a plena fruição do incentivo.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Exemplo Prático Detalhado: Uma empresa industrial, "Indústria Conforme Ltda.", localizada na Mesorregião da Mata Pernambucana, apurou no mês de agosto de 2024 um Saldo Devedor Total de ICMS de R$150.000,00. Após o cálculo detalhado (conforme a Trilha 1), determinou-se um valor de Crédito Presumido de PROIND de R$98.625,00.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Passo a Passo para o Lançamento e Controle:'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '1. Lançamento na EFD-ICMS/IPI:'
      },
      {
        tipo: 'lista',
        conteudo: [
        'No sistema de escrituração fiscal (software contábil/fiscal), a "Indústria Conforme Ltda." acessa o módulo de apuração do ICMS referente ao período de agosto de 2024.',
        'No Registro E110, o VL_ICMS_APURADO será R$150.000,00.',
        {
          texto: 'No Registro E111, ela irá adicionar uma nova linha de ajuste para dedução:',
          subItens: [
            'COD_AJ_APUR: PE040012',
            'DESCR_COMPL_AJ: Crédito Presumido PROIND - Anexo 33, Decreto 44.650/2017',
            'VL_AJ_APUR: 98625.00'
          ]
        },
        'Após o lançamento, o sistema recalculará o VL_ICMS_RECOLHER no Registro E110, que passará a ser R$150.000,00 - R$98.625,00 = R$51.375,00.',
        'A empresa então valida a EFD-ICMS/IPI usando o PVA para verificar a consistência dos dados e transmite o arquivo dentro do prazo legal, geralmente até o dia 15 do mês subsequente ao da apuração.'
      ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Manutenção da Planilha Demonstrativa:'
      },
      {
        tipo: 'lista',
        conteudo: [
          'Concomitantemente ao lançamento fiscal, a "Indústria Conforme Ltda." mantém uma planilha de controle interno, salvando-a em um diretório específico para auditoria fiscal.',
        {
          texto: 'Nesta planilha, registra-se:',
          subItens: [
            'CNPJ: XX.XXX.XXX/XXXX-XX',
            'Inscrição Estadual: XXXXXXXXX-X',
            'Mês de Apuração: Agosto/2024',
            'Base Legal: Art. X, Anexo 33, Decreto 44.650/2017',
            'Saldo Devedor de ICMS Antes do Incentivo: R$ 150.000,00',
            'Receita Bruta Total (Agosto/2024): R$ 1.000.000,00',
            'Receita Incentivada (Agosto/2024): R$ 770.000,00 (referência a relatórios de vendas e notas fiscais)',
            'Proporção de Saídas Incentivadas: 77% (R$ 770.000 / R$ 1.000.000)',
            'Percentual PROIND Aplicado: 85% (Mesorregião Mata Pernambucana)',
            'Base de Cálculo do Incentivo: R$ 150.000,00 (Saldo Devedor) * 77% (Proporção) = R$ 115.500,00',
            'Valor do Crédito Presumido de PROIND: R$ 115.500,00 * 85% = R$ 98.175,00 (Valor ajustado para o exemplo, considerando a proporção)',
            'ICMS a Recolher Após Incentivo: R$ 150.000,00 - R$ 98.175,00 = R$ 51.825,00',
            'Observações: Confirmação da regularidade fiscal na data de vencimento.'
          ]
        },
        'Essa planilha é salva em local seguro, com controle de versão, e acessível para a empresa e para eventual apresentação ao Fisco.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Monitoramento da Regularidade:'
      },
      {
        tipo: 'lista',
        conteudo: [
          'A cada período fiscal, a "Indústria Conforme Ltda." realiza uma verificação proativa de sua regularidade fiscal, consultando os portais da SEFAZ-PE para garantir que não há pendências de obrigações acessórias ou débitos tributários.',
          'Caso, por exemplo, houvesse um atraso na entrega da EFD-ICMS/IPI superior a 15 dias, ou se a EFD fosse transmitida com um erro que implicasse em um pagamento a menor do ICMS (erro que a fiscalização detectasse), o crédito presumido de R$ 98.175,00 poderia ser reduzido em 10%. Nesse cenário, o benefício passaria a ser R$98.175,00 - (10% de R$98.175,00) = R$98.175,00 - R$9.817,50 = R$88.357,50. Isso exigiria uma retificação da EFD-ICMS/IPI e um pagamento complementar do ICMS, acrescido de multas e juros, caso o lançamento original já tivesse sido feito com o valor cheio.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Este exemplo demonstra a interligação entre o cálculo, o lançamento fiscal, o controle documental rigoroso e a importância do contribuinte para a plena e segura fruição do incentivo.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Referências Oficiais:'
      },
      {
        tipo: 'lista-bullet',
        conteudo: [
          'Decreto 44.650.2017 - Anexo 33 (com as alterações mais recentes).',
          'Portaria SF nº 126, de 30 de agosto de 2018 (mencionada no Art. 5º, II, do Anexo 33 para o código PE 040012).',
          'Guia Prático da EFD-ICMS/IPI (disponível no site do SPED da Receita Federal do Brasil), para detalhes sobre os registros.',
          'Legislação sobre Certidões Negativas de Débitos.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'É crucial que o contribuinte sempre consulte as versões mais recentes da legislação e os comunicados oficiais da SEFAZ-PE, pois as normas podem sofrer alterações.'
      },
    ],

    materiaisComplementares: [
      {
        texto: 'DO PROGRAMA DE ESTÍMULO À INDÚSTRIA DO ESTADO DE PERNAMBUCO - PROIND',
        url: 'https://drive.google.com/file/d/1tSY57GXSjpKXKDNoKElOnPfgERyyGsKV/view?usp=sharing'
      },
    ]
  },

  {
    id: 'proind-controle-suplementar',
    programa: 'PROIND',
    titulo: 'T3: Controles Suplementares',
    descricaoHeader: 'Entenda os controles e a importância de manter a regularidade fiscal para a fruição do PROIND.',
    sobreTrilha: 'Nesta trilha, vamos abordar os controles suplementares exigidos pela legislação e as implicações da regularidade fiscal.', 
    urlVideo: '', 
    blocosDeConteudo: [
      {
        tipo: 'subtitulo-bold',
        conteudo: '1. Introdução e Contextualização do Tema'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A simples aplicação do crédito presumido do PROIND, ainda que corretamente calculada e lançada na EFD-ICMS/IPI, não encerra as obrigações do contribuinte. A legislação que disciplina o PROIND estabelece uma série de controles suplementares que visam garantir a regularidade fiscal contínua da empresa, a manutenção de um patamar mínimo de recolhimento de ICMS e o cumprimento de obrigações acessórias específicas. O objetivo desses controles é assegurar que o benefício fiscal esteja alinhado com a política de desenvolvimento econômico do Estado, promovendo a geração de empregos e renda, e que sua utilização não gere desequilíbrios na arrecadação estadual. A atenção a esses pontos é fundamental para evitar a glosa do benefício, a aplicação de multas e juros, a suspensão da sua fruição e, em casos mais graves, a cassação do regime especial. A gestão proativa desses controles é um pilar para a sustentabilidade do benefício e a conformidade fiscal da empresa.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Manutenção da Regularidade Fiscal'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A continuidade da fruição do crédito presumido do PROIND está condicionada à manutenção da regularidade fiscal do contribuinte perante a Secretaria da Fazenda de Pernambuco (SEFAZ-PE), bem como perante outras esferas governamentais (Federal e Municipal) e o Fundo de Desenvolvimento do Estado de Pernambuco (FEP). Esta regularidade abrange tanto as obrigações tributárias principais (o recolhimento do ICMS devido e outros tributos) quanto as acessórias (entrega de declarações, livros fiscais eletrônicos, etc.).'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A legislação é enfática ao prever a vedação da utilização do crédito presumido em cada período fiscal de apuração se, na data de vencimento do ICMS normal, o contribuinte não estiver regular. A prova dessa regularidade é a apresentação de certidão de regularidade fiscal (como a Certidão Negativa de Débitos – CND) emitida na referida data. É crucial que a empresa implemente um sistema de monitoramento contínuo de suas certidões e pendências fiscais, utilizando os serviços online da SEFAZ-PE (ex: Portal e-Fisco) e outros órgãos, para identificar e sanar quaisquer irregularidades antes que impactem a fruição do benefício. Além disso, a prática de crime contra a ordem tributária, com comunicação ao Ministério Público de Pernambuco (MPPE), também veda a utilização do benefício, evidenciando a gravidade e o caráter ético-legal da concessão do PROIND. A perda da regularidade pode levar não apenas à glosa do benefício no período da irregularidade, mas também a questionamentos sobre períodos anteriores, exigindo a devolução de valores já utilizados.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Controle do ICMS Mínimo Anual'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O contribuinte beneficiário do PROIND está sujeito à exigência de manutenção de um valor mínimo anual de recolhimento do imposto. Este é um mecanismo de controle para garantir que o Estado continue a ter uma arrecadação mínima das empresas incentivadas, mesmo com a concessão do crédito presumido. O objetivo é assegurar que o benefício incentive o crescimento da base de arrecadação, e não apenas a redução do imposto devido.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O cálculo desse valor mínimo varia:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Estabelecimento novo: Corresponde a R$150.000,00 anuais. Considera-se "novo" aquele com inscrição no CACEPE (Cadastro de Contribuintes do Estado de Pernambuco) há, no máximo, 12 meses até a data do pedido de fruição do benefício. Este valor serve como um piso para empresas que não possuem histórico de recolhimento.',
          'B - Demais Casos: O valor é o somatório dos recolhimentos nominais de ICMS dos 12 meses imediatamente anteriores à publicação do decreto concessivo do benefício. Os recolhimentos considerados são aqueles sob os códigos de receita específicos (005-1, 017-5, 057-4, 058-2, 059-0, 062-0, 090-6, 097-3 e 099-0), que geralmente se referem ao ICMS-Próprio (apurado nas operações da empresa). O valor de R$150.000,00 serve como patamar mínimo mesmo para esses casos, ou seja, se o somatório dos 12 meses for inferior a R$150.000,00, o mínimo a ser recolhido será R$150.000,00.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'No primeiro ano de utilização do benefício, o valor mínimo é proporcional ao número de meses de fruição, contado do mês seguinte à publicação do decreto concessivo até dezembro. A Sefaz divulga anualmente, por edital no Diário Oficial do Estado (DOE), o valor do montante mínimo anual para cada estabelecimento autorizado, permitindo a impugnação pelo contribuinte em caso de discordância, mediante processo administrativo. Esse valor é atualizado anualmente em janeiro com base na variação da Taxa Referencial (TR), garantindo a correção monetária. Empresas devem monitorar este valor de perto e projetar seus recolhimentos ao longo do ano.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Aferição e Recolhimento da Diferença do ICMS Mínimo'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Ao final de cada ano civil, o contribuinte beneficiário do PROIND deve aferir o cumprimento da exigência do valor mínimo anual de recolhimento do imposto. Para essa aferição, são considerados os recolhimentos efetivados sob os mesmos códigos de receita utilizados no cálculo do ICMS mínimo. É fundamental que a empresa mantenha um registro detalhado desses recolhimentos ao longo do ano.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Um ponto importante é que o valor do depósito realizado ao Fundo Estadual de Equilíbrio Fiscal (FEEF) deve ser somado ao valor do ICMS efetivamente recolhido para essa aferição, conforme o Decreto nº 43.346/2016. Esta inclusão visa reconhecer o esforço fiscal do contribuinte que, além do ICMS, contribui para o FEEF como contrapartida ao benefício.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Caso o contribuinte não tenha atingido o patamar estabelecido como valor mínimo anual, o saldo residual (diferença entre o valor mínimo e o efetivamente recolhido) deve ser recolhido sem acréscimos até o dia 31 de março do ano seguinte à fruição, sob o código de receita 110-3. É importante ressaltar que o valor a ser recolhido a título de saldo residual é limitado ao montante total do crédito presumido utilizado pelo contribuinte no ano anterior. Isso significa que a empresa nunca será obrigada a recolher mais do que o benefício que efetivamente utilizou, garantindo que o PROIND não se torne um ônus maior do que o benefício. A falta de recolhimento ou recolhimento a menor do saldo residual pode acarretar multas e juros, além de comprometer a continuidade do benefício.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '5. Controle e Recolhimento da Taxa de Fiscalização (TFPE)'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A utilização do crédito presumido do PROIND sujeita o contribuinte ao recolhimento de uma taxa em razão da fiscalização relacionada ao cumprimento das condições do benefício. Esta taxa, denominada Taxa de Fiscalização e Utilização de Incentivos Fiscais (TFPE), corresponde a 2% (dois por cento) sobre o montante do crédito presumido utilizado no período de apuração. É crucial entender que a base de cálculo é o valor efetivamente aproveitado do benefício, e não o valor potencial.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O recolhimento da taxa deve ser feito por meio de Documento de Arrecadação Estadual (DAE) gerado eletronicamente no Portal e-Fisco, até o último dia útil do mês subsequente ao período fiscal da utilização do benefício. Por exemplo, a TFPE referente ao crédito utilizado em janeiro deve ser recolhida até o último dia útil de fevereiro. O não recolhimento da taxa ou o recolhimento com valor incorreto sujeita o contribuinte a multa de ofício de 40% sobre o valor não recolhido, além de multas e juros de mora em caso de recolhimento espontâneo fora do prazo. A fiscalização é rigorosa quanto a esta taxa, sendo um ponto comum de autuação. Os valores arrecadados com esta taxa e seus acréscimos constituem receitas do Fundo de Desenvolvimento do Estado de Pernambuco (FEP), contribuindo para o desenvolvimento econômico do estado. A empresa deve ter um processo robusto de cálculo e conciliação mensal entre o crédito presumido declarado na EFD-ICMS/IPI e o valor da TFPE recolhida.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '6. Gerenciamento de Obrigações Acessórias Eletrônicas'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O cumprimento adequado das obrigações acessórias eletrônicas é um controle fundamental para a integridade do benefício e a transparência fiscal. A legislação do PROIND prevê reduções no valor do crédito presumido utilizado quando há irregularidades na entrega dos arquivos relativos aos livros fiscais eletrônicos, como a EFD-ICMS/IPI e o eDoc. Essas reduções são penalidades que visam garantir a qualidade e a pontualidade das informações prestadas ao fisco.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A redução é de 10% no valor do crédito presumido se houver irregularidade na entrega dos arquivos que implique em pagamento a menor do imposto, ou quando o arquivo não for entregue no prazo estabelecido, com atraso superior a 15 dias. Esta é uma penalidade significativa, pois impacta diretamente o benefício. Uma redução menor, de 2% (com valor mínimo de R$1.200,00 e máximo de R$20.000,00), aplica-se quando a irregularidade se refere apenas a erro na prestação da informação do montante do crédito presumido utilizado, sem que isso tenha implicado pagamento a menor do imposto. Um exemplo seria informar o valor do crédito no Registro E110 da EFD-ICMS/IPI de forma incorreta, mesmo que o ICMS final esteja correto. A gestão rigorosa dos prazos, a validação prévia dos arquivos (utilizando o PVA da EFD e outras ferramentas de auditoria fiscal) e a qualidade do preenchimento desses arquivos são vitais para evitar essas penalidades. Empresas devem investir em sistemas ERP e fiscais que garantam a correta geração e transmissão dessas declarações, bem como em processos de conferência interna.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Exemplo Prático Detalhado: Uma empresa industrial, "Componentes PE S.A.", beneficiária do PROIND, utilizou um total de R$800.000,00 de crédito presumido durante o ano civil de 2024. O valor mínimo anual de recolhimento de ICMS para essa empresa, conforme divulgado pela SEFAZ, é de R$250.000,00. Ao final do ano, a empresa verificou que seus recolhimentos de ICMS (considerando os códigos específicos) mais o FEEF somaram R$200.000,00.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Passo a Passo dos Controles Suplementares:'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '1. Monitoramento Contínuo da Regularidade Fiscal:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Mensalmente, a "Componentes PE S.A." deve emitir certidões de regularidade fiscal (Federal, Estadual e Municipal) e monitorar pendências através dos portais de serviços online dos respectivos órgãos. Se uma pendência surgir (ex: multa de trânsito não paga por um veículo da frota que impede a emissão de CND estadual), ela deve ser regularizada imediatamente. Se, por exemplo, em setembro de 2024, a empresa estivesse irregular por uma infração não sanada até o vencimento do ICMS de setembro, ela não poderia utilizar o crédito presumido do PROIND referente àquele mês, mesmo que o cálculo estivesse correto e a EFD-ICMS/IPI já tivesse sido transmitida. O benefício seria glosado para aquele período.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Cálculo e Aferição do ICMS Mínimo Anual:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - No final de 2024 (dezembro), a "Componentes PE S.A." realiza uma conciliação interna de seus recolhimentos de ICMS (e FEEF) para o ano.',
          'B - Total Recolhido + FEEF = R$ 200.000,00',
          'C - Valor Mínimo Anual = R$ 250.000,00',
          'D - Diferença = R$ 250.000,00 - R$ 200.000,00 = R$ 50.000,00 (saldo residual)',
          'E - Como a diferença de R$ 50.000,00 é menor que o total de crédito presumido utilizado no ano (R$ 800.000,00), a empresa deve recolher os R$ 50.000,00 sob o código de receita 110-3 (ICMS - Diferença de Recolhimento Mínimo - PROIND) até 31 de março de 2025. Este recolhimento é essencial para manter a elegibilidade ao benefício nos anos seguintes.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Cálculo e Recolhimento da Taxa de Fiscalização (TFPE):'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Suponha que em outubro de 2024, a "Componentes PE S.A." utilizou R$ 70.000,00 de crédito presumido do PROIND, conforme apurado na EFD-ICMS/IPI (Registro E110, campo VL_TOT_AJ_DEB).',
          'B - Cálculo da Taxa: 2% sobre R$70.000,00 = R$1.400,00.',
          'C - Este valor de R$1.400,00 deve ser recolhido por DAE, gerado no Portal e-Fisco, até o último dia útil de novembro de 2024. Se a empresa não recolher, ou recolher a menor, estará sujeita à multa de 40% sobre o valor não recolhido (40% de R$1.400,00 = R$560,00), além de juros de mora, caso a fiscalização identifique a infração. A conciliação mensal entre o valor da TFPE pago e o crédito presumido utilizado é uma prática de best practice.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Gestão das Obrigações Acessórias Eletrônicas:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - A EFD-ICMS/IPI de "Componentes PE S.A." referente a outubro de 2024 é transmitida com 20 dias de atraso (o prazo limite é dia 15 do mês seguinte).',
          'B - Conforme o Art. 7º, §1º, I do Anexo 33, este atraso superior a 15 dias na entrega do arquivo eletrônico configura irregularidade que implica em penalidade.',
          'C - Consequentemente, o valor do crédito presumido utilizado em outubro seria reduzido em 10%. Se o crédito presumido de outubro foi de R$70.000,00, a redução seria de R$7.000,00 (10% de R$70.000,00). Isso significa que a empresa só poderia usufruir de R$63.000,00 daquele benefício, tendo de pagar a diferença de R$7.000,00 de ICMS, além de multa e juros pelo recolhimento a menor. A empresa precisaria retificar a EFD-ICMS/IPI e recolher a diferença de imposto.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Esses exemplos ilustram a necessidade de um monitoramento proativo e contínuo por parte da empresa, com processos internos bem definidos e sistemas de informação confiáveis, para garantir a plena conformidade e o aproveitamento integral do PROIND, mitigando riscos fiscais e operacionais.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Referências Oficiais:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Decreto 44.650.2017 - Anexo 33 (especialmente Capítulos IV, V e VI, e suas respectivas seções).',
          'B - Decreto nº 43.346, de 29 de julho de 2016 (referenciado no Art. 14 do Anexo 33, sobre o FEEF).',
          'C - Portaria SF nº 126, de 30 de agosto de 2018 (mencionada no Art. 5º, II, do Anexo 33).',
          'D - Legislação específica sobre Certidão de Regularidade Fiscal (ex: Portaria SF 190/2011 e suas alterações).',
          'E - Manuais e Guias de Preenchimento da EFD-ICMS/IPI (Bloco E – Apuração do ICMS e IPI).'
        ]
      },
    ],

    materiaisComplementares: [
      {
        texto: 'DO PROGRAMA DE ESTÍMULO À INDÚSTRIA DO ESTADO DE PERNAMBUCO - PROIND',
        url: 'https://drive.google.com/file/d/1tSY57GXSjpKXKDNoKElOnPfgERyyGsKV/view?usp=sharing'
      },
    ]
  },

{
    id: 'proind-concessao-incentivo',
    programa: 'PROIND',
    titulo: 'T4: Concessão do Incentivo',
    descricaoHeader: 'Entenda o processo de concessão e os requisitos para a fruição do benefício fiscal.', 
    sobreTrilha: 'Esta trilha detalha as etapas e critérios para a concessão formal do incentivo PROIND, desde a solicitação até a publicação do decreto.', 
    urlVideo: '', 
    blocosDeConteudo: [
      {
        tipo: 'subtitulo-bold',
        conteudo: '1. Introdução e Contextualização do Tema'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A fruição do crédito presumido do PROIND não é automática; ela é condicionada a uma prévia autorização formal do Poder Executivo do Estado de Pernambuco, materializada por meio de um decreto. Este processo de concessão é a porta de entrada para que a empresa industrial possa, de fato, usufruir dos incentivos fiscais. Ele envolve a análise criteriosa da solicitação do contribuinte, a verificação de requisitos específicos e a formalização da concessão do benefício.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'O objetivo primordial deste processo é assegurar que apenas as empresas que atendam plenamente às condições e critérios estabelecidos na legislação sejam habilitadas a receber o incentivo, garantindo a conformidade, a transparência و a efetividade na aplicação da política fiscal. Para o Estado, a concessão é um instrumento estratégico para fomentar o desenvolvimento industrial, atrair investimentos, gerar empregos e, consequentemente, expandir sua base econômica e arrecadatória. Para a empresa, é a formalização de uma parceria que visa a competitividade e o crescimento. A compreensão detalhada desta etapa é crucial para que o processo de adesão ao PROIND seja bem-sucedido e sem contratempos, evitando futuras glosas ou questionamentos fiscais.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Requisitos e Processo de Solicitação'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Para iniciar o processo de concessão do PROIND, o contribuinte deve formalizar um pedido específico junto à Agência de Desenvolvimento Econômico de Pernambuco (ADEPE), que atua como o órgão responsável pela recepção e análise inicial das solicitações. Esta é a porta de entrada do processo administrativo, onde a ADEPE realiza uma primeira triagem e avaliação do potencial econômico do projeto. A solicitação deve atender a uma série de requisitos para ser considerada elegível ao benefício, garantindo que o programa beneficie empresas com as características desejadas pelo Estado.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Os principais requisitos incluem:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Inscrição no CACEPE: A empresa deve estar devidamente inscrita no Cadastro de Contribuintes do Estado de Pernambuco (CACEPE) sob o regime normal de apuração do ICMS. Isso indica que a empresa já possui uma operação formalizada no estado e está apta a cumprir suas obrigações fiscais.',
          'B - Atividade Econômica Principal de Indústria: O principal ramo de atuação da empresa, conforme registrado em seu CNPJ (Classificação Nacional de Atividades Econômicas - CNAE principal) e Inscrição Estadual, deve ser a atividade industrial. O PROIND visa o desenvolvimento e a modernização do setor industrial, sendo fundamental que o objeto social da empresa reflita essa natureza.',
          'C - Regularidade Fiscal: A empresa, e o conjunto de seus estabelecimentos neste Estado, deve estar regular perante a SEFAZ em relação a todas as obrigações tributárias, sejam elas principais (pagamento de impostos, taxas, contribuições) ou acessórias (entrega de declarações como EFD-ICMS/IPI, GIA, livros fiscais, etc.). A comprovação se dá, geralmente, pela apresentação de Certidões Negativas de Débitos (CNDs) ou Positivas com Efeito de Negativa.',
          'D - Sócios Sem Irregularidades: É proibida a participação, no quadro societário da empresa solicitante, de sócio que esteja ou tenha participado de empresa em situação irregular perante a SEFAZ. Este critério visa coibir a utilização do benefício por empresas ligadas a históricos de não conformidade fiscal, reforçando a integridade do programa.',
          'E - Capital Social Mínimo: A empresa deve possuir um capital social de, no mínimo, R$100.000,00. Este valor é um indicativo de solidez financeira, capacidade de investimento e seriedade do empreendimento, garantindo que o benefício seja direcionado a projetos com maior estabilidade.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Após a análise preliminar e o parecer técnico sobre os aspectos econômicos do estabelecimento, a ADEPE encaminha o requerimento ao órgão da SEFAZ responsável pelo controle de benefícios fiscais. A SEFAZ, por sua vez, realiza uma análise fiscal aprofundada para verificar a conformidade tributária e a elegibilidade final.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Informações Essenciais no Pedido'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Além dos requisitos formais, o pedido de concessão do PROIND deve conter informações detalhadas sobre a empresa e seus planos, que são cruciais para a análise da ADEPE e da SEFAZ. Essas informações não são meros dados estatísticos; elas representam compromissos e indicadores do potencial de impacto do projeto, sendo fundamentais para a decisão de concessão. As informações variam ligeiramente se a empresa estiver em fase de implantação (ainda não operando plenamente) ou já em funcionamento.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Para empresas em fase de implantação, é necessário informar:'
      },
      {
        tipo: 'lista-bullet',
        conteudo: [
          'Previsão de Geração de Empregos: O número de postos de trabalho que serão criados na unidade industrial até o final do segundo ano de operação, incluindo os empregos ocupados por terceirizados. Este dado demonstra o impacto social e econômico do projeto, abrangendo tanto empregos diretos quanto aqueles gerados na cadeia de valor da empresa.',
          'Previsão de Investimentos Totais: O montante total de investimentos que serão realizados na unidade nos cinco anos subsequentes ao do início da fruição do benefício. Isso inclui investimentos em infraestrutura, máquinas, equipamentos, tecnologia, pesquisa e desenvolvimento (R&D), e treinamento de pessoal. Este valor reflete o comprometimento da empresa com o desenvolvimento e a modernização de sua estrutura produtiva.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Para empresas já em funcionamento, o pedido deve apresentar:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Número Total de Empregos Existentes: A quantidade atual de empregos na unidade industrial, também incluindo os postos ocupados por terceirizados. Este dado permite à SEFAZ e ADEPE avaliar a contribuição atual da empresa para o mercado de trabalho local.',
          'B - Investimentos Totais Realizados: O volume total de investimentos que a empresa realizou na unidade nos últimos cinco anos. Essa informação demonstra o histórico de reinvestimento e a capacidade de expansão da empresa.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Esses dados permitem que a ADEPE e a SEFAZ avaliem o potencial de desenvolvimento e a contribuição da empresa para a economia do Estado, alinhando a concessão do benefício com os objetivos macroeconômicos do programa. A clareza, a precisão e a comprovação dessas informações são vitais para o deferimento do pedido, sendo muitas vezes exigida a apresentação de um plano de negócios ou estudo de viabilidade.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Início da Fruição e Efeitos do Decreto Concessivo'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A concessão do crédito presumido do PROIND é formalizada por um decreto do Poder Executivo, que é publicado no Diário Oficial do Estado (DOE). A data de publicação deste decreto é um marco crucial, pois determina o momento a partir do qual a empresa está legalmente apta a usufruir do benefício. O decreto possui força de lei e estabelece as condições específicas, o percentual de crédito presumido e o prazo de validade do incentivo.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'É importante notar que o crédito presumido do PROIND somente pode ser utilizado a partir dos fatos geradores ocorridos no período fiscal subsequente àquele da publicação do respectivo decreto autorizativo. Ou seja, se o decreto for publicado в agosto, a empresa poderá começar a utilizar o benefício sobre os fatos geradores (saídas de mercadorias, produção industrial) que ocorrerem a partir de setembro. Não há retroatividade na fruição do incentivo. Este detalhe temporal é fundamental para o planejamento financeiro e fiscal da empresa, exigindo atenção para evitar a aplicação indevida do benefício em períodos anteriores à sua validade legal. O benefício tem prazo de validade determinado (até 31 de dezembro de 2032, conforme Art. 2º do Anexo 33), mas pode ser cancelado a pedido do contribuinte, mediante portaria da SEFAZ, com efeitos a partir da data nela mencionada, ou revogado unilateralmente pelo Estado em caso de descumprimento das condições.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '5. Substituição do PRODEPE pelo PROIND'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Um caso específico de concessão de incentivo é a possibilidade de um estabelecimento industrial já incentivado pelo PRODEPE (Programa de Desenvolvimento do Estado de Pernambuco) solicitar, em caráter definitivo, a substituição de seu incentivo pelo crédito presumido do PROIND. Essa faculdade permite que empresas migrem para o novo regime, se este for mais vantajoso em termos de percentual, regras de apuração ou se enquadrar melhor em suas operações atuais, buscando maior competitividade ou simplificação fiscal.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Para realizar essa substituição, a opção deve ser expressamente declarada no pedido de concessão do PROIND, conforme detalhado no item 2. Se a opção for manifestada e as regras de habilitação para o PROIND forem atendidas, a SEFAZ tomará as seguintes providências administrativas:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Indicará no decreto de concessão do PROIND a circunstância da substituição dos incentivos do PRODEPE, vinculando os dois regimes.',
          'B - Publicará uma portaria específica de cancelamento dos incentivos industriais do PRODEPE, com termo final de validade no último dia do mês em que o decreto de concessão do PROIND for publicado. Isso garante a transição sem sobreposição ou lacunas.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'As empresas que optam pela substituição devem observar todas as regras do PROIND, com duas particularidades importantes:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Ficam sujeitas às regras de manutenção do valor mínimo anual de recolhimento do imposto (conforme Trilha 3), mesmo que não fossem obrigadas a manter um montante mínimo pelo regime do PRODEPE. Esta é uma condição fundamental do PROIND que se estende aos migrantes.',
          'B - Podem conservar o percentual de crédito presumido originalmente previsto em seu decreto concessivo do PRODEPE, caso este percentual seja maior do que aquele que lhes caberia na substituição pelo PROIND (com base na localização ou atividade). Esta é uma "cláusula de salvaguarda" que visa garantir que a migração não resulte em perda de benefício para empresas já estabelecidas e com um percentual mais vantajoso pelo regime anterior, incentivando a adesão ao novo programa sem prejuízos.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '6. Homologação e Glosa do Benefício'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A utilização do crédito presumido do PROIND está sujeita à posterior homologação da SEFAZ, seguindo o princípio da homologação tácita previsto no Art. 150 do Código Tributário Nacional (CTN). Isso significa que a SEFAZ tem um prazo legal para se manifestar sobre a correção dos lançamentos efetuados pelo contribuinte. Na ausência de manifestação expressa dentro do prazo, a utilização é considerada homologada tacitamente, mas isso não impede que o Fisco, em fiscalizações futuras, identifique e questione inconsistências ou irregularidades.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A utilização indevida do benefício sujeita o contribuinte à glosa (cancelamento parcial ou total) do crédito presumido. Uma utilização é considerada indevida quando o contribuinte, no momento do vencimento da obrigação tributária, não atender às exigências previstas no Anexo 33 para a sua fruição. Isso pode incluir, por exemplo, a falta de regularidade fiscal, o descumprimento de obrigações acessórias (como a não entrega ou entrega incorreta de declarações fiscais), a aplicação do benefício sobre produtos não incentivados, o cálculo incorreto do crédito presumido, ou o não cumprimento de metas de emprego e investimento estabelecidas no decreto concessivo. A glosa acarreta a exigência do valor do imposto que deixou de ser recolhido, acrescido de multa (que pode ser de até 100% do valor do imposto), juros de mora e atualização monetária, nos termos da legislação específica.'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'É fundamental que a empresa esteja ciente de que a utilização do benefício é uma prerrogativa, mas sua validação é um ato posterior do Fisco. No entanto, se o contribuinte, antes do início de uma ação fiscal (auditoria ou notificação), promover a regularização espontânea das infrações que levariam à glosa, não se aplica a penalidade. Isso incentiva a autorregularização e o cumprimento voluntário das normas, reforçando a importância de controles internos robustos, monitoramento contínuo da conformidade fiscal e auditorias internas periódicas para identificar e corrigir eventuais desvios antes que o Fisco o faça.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Exemplo Prático Detalhado:'
      },
      {
        tipo: 'paragrafo',
        conteudo: 'A empresa "Metais Nordeste Ltda.", especializada na produção de laminados de alumínio de alta tecnologia, decide solicitar o benefício do PROIND para sua unidade industrial em Garanhuns, Agreste Pernambucano, visando expandir sua capacidade produtiva.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Passo a Passo da Concessão:'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '1. Verificação de Requisitos e Preparação:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - A "Metais Nordeste Ltda." verifica que está devidamente inscrita no CACEPE, possui CNAE principal industrial (e.g., 2441-5/02 - Produção de laminados de alumínio), seu capital social supera R$ 100.000,00 (R$ 5.000.000,00). Realiza um levantamento de suas Certidões Negativas de Débitos (CNDs) para comprovar plena regularidade fiscal e assegura que seus sócios não possuem irregularidades fiscais passadas.',
          'B - Como a empresa já está em funcionamento há 10 anos, prepara os dados sobre o número atual de empregos (250 diretos, 50 terceirizados) e os investimentos realizados nos últimos 5 anos (R$ 15 milhões em modernização de equipamentos e expansão de linha).'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '2. Formalização do Pedido à ADEPE:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Em 15 de maio de 2024, a "Metais Nordeste Ltda." protocola seu pedido formal de concessão do PROIND junto à ADEPE, anexando toda a documentação comprobatória dos requisitos, as informações detalhadas sobre empregos e investimentos, e um plano de negócios que projeta a criação de mais 50 empregos diretos nos próximos 2 anos.',
          'B - A ADEPE realiza a análise preliminar dos aspectos econômicos do projeto, verificando seu alinhamento com as políticas de desenvolvimento do Estado, e, após a aprovação de seu parecer técnico, encaminha o processo à SEFAZ para análise fiscal.'
        ]
      }, 
      {
        tipo: 'subtitulo-bold',
        conteudo: '3. Publicação do Decreto Concessivo:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Após a análise da SEFAZ, o decreto autorizativo para a "Metais Nordeste Ltda." é assinado pelo Governador e publicado no Diário Oficial do Estado em 10 de agosto de 2024. O decreto estabelece que a empresa terá direito ao percentual de 90% (por estar no Agreste Pernambucano). No entanto, como sua atividade de "produção de laminados de alumínio" é classificada como de alta intensidade de capital e tecnologia, o decreto aplica o percentual de 95% sobre o saldo devedor do ICMS (conforme Art. 2º, IV, "b", 2 do Anexo 33), reconhecendo a relevância estratégica da atividade.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '4. Início da Fruição:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Como o decreto foi publicado em agosto, a "Metais Nordeste Ltda." pode começar a utilizar o crédito presumido do PROIND sobre os fatos geradores (saídas de mercadorias) que ocorrerem a partir do período fiscal subsequente, ou seja, setembro de 2024. Os cálculos e lançamentos da Trilha 1 e Trilha 2 passam a ser aplicáveis a partir deste mês, impactando diretamente a apuração do ICMS de setembro.'
        ]
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: '5. Monitoramento Pós-Concessão (Homologação e Glosa):'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Durante a utilização do benefício, a "Metais Nordeste Ltda." continua a manter sua regularidade fiscal, cumprir todas as obrigações acessórias (como a entrega da EFD-ICMS/IPI) e as metas de emprego e investimento. Se, por exemplo, em março de 2025, a empresa deixasse de entregar a EFD-ICMS/IPI do mês de fevereiro no prazo ou a entregasse com inconsistências graves que impedissem a correta apuração do imposto, a utilização do crédito presumido de fevereiro de 2025 poderia ser glosada pela SEFAZ em uma fiscalização posterior. Isso acarretaria a exigência do imposto não pago, acrescido de multas e juros. Contudo, se a empresa identificasse o erro e retificasse a EFD antes de ser fiscalizada, a glosa poderia ser evitada pela regularização espontânea, com redução das penalidades. Se a empresa mantiver a regularidade, o benefício continua sendo usufruído sem intercorrências, garantindo a previsibilidade fiscal.'
        ]
      },
      {
        tipo: 'paragrafo',
        conteudo: 'Este exemplo demonstra que a concessão é apenas o início; a manutenção do benefício depende do cumprimento contínuo das normas e do monitoramento fiscal rigoroso por parte da empresa, em um ciclo de conformidade e benefício mútuo entre o Estado e o contribuinte.'
      },
      {
        tipo: 'subtitulo-bold',
        conteudo: 'Referências Oficiais:'
      },
      {
        tipo: 'lista-alfabetica',
        conteudo: [
          'A - Decreto 44.650/2017 - Anexo 33 (especialmente Capítulo VII - Da Concessão do Incentivo, Capítulo VIII - Da Substituição de Incentivo e Capítulo IX - Da Fruição do Incentivo, e suas respectivas seções).',
          'B - Código Tributário Nacional (CTN) - Art. 150 (para conceito de homologação do lançamento).',
          'C - Legislação específica da ADEPE e da SEFAZ-PE sobre o trâmite de processos de incentivos fiscais.'
        ]
      },
    ],

    materiaisComplementares: [
      {
        texto: 'DO PROGRAMA DE ESTÍMULO À INDÚSTRIA DO ESTADO DE PERNAMBUCO - PROIND',
        url: 'https://drive.google.com/file/d/1tSY57GXSjpKXKDNoKElOnPfgERyyGsKV/view?usp=sharing'
      },
    ]
  },
  
  {
    id: 'prodepe-calculo-incentivo',
    programa: 'PRODEPE',
    titulo: 'T1: Cálculo do Incentivo',
    descricaoHeader: 'Detalha os passos e critérios essenciais para a apuração do valor do incentivo do PRODEPE.',
    sobreTrilha: 'O Programa de Desenvolvimento do Estado de Pernambuco (PRODEPE) é uma das principais ferramentas de incentivo fiscal do Estado...',
    urlVideo: '',
    blocosDeConteudo: [
      {
      tipo: 'paragrafo',
      conteudo: 'O Programa de Desenvolvimento do Estado de Pernambuco (PRODEPE), instituído pela Lei nº 11.675/1999 e regulamentado pelo Decreto nº 21.959/1999, é uma das principais ferramentas de incentivo fiscal do Estado. A compreensão da metodologia de cálculo do incentivo é fundamental para empresas que buscam se beneficiar do programa, garantindo a correta aplicação da legislação e a plena fruição dos benefícios concedidos. Esta trilha detalha os passos e critérios essenciais para a apuração do valor do incentivo do PRODEPE.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Critérios de Elegibilidade para o Cálculo do Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O cálculo do incentivo do PRODEPE se aplica a empresas industriais e comerciais atacadistas que foram previamente habilitadas e tiveram seu benefício formalizado por decreto do Poder Executivo. A elegibilidade para o cálculo específico do incentivo está ligada ao tipo de atividade e projeto, sendo principalmente direcionada aos seguintes cenários:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Projetos de Implantação: Empresas que estão iniciando suas atividades industriais ou comerciais atacadistas em Pernambuco.',
        'B - Projetos de Ampliação: Empresas já existentes que aumentam sua capacidade produtiva ou de comercialização. Nesses casos, o cálculo do benefício incide exclusivamente sobre o incremento da produção comercializada ou sobre o ICMS mensal que exceda a arrecadação média dos últimos 12 meses anteriores à apresentação do projeto.',
        'C - Projetos de Revitalização: Empresas que reativam operações paralisadas por determinado período, ou que demonstram significativo declínio em sua produção.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O incentivo incide sobre Produtos Incentivados (PI), que são aqueles relacionados especificamente no decreto concessivo de cada empresa. A correta identificação e segregação das operações com PI é o primeiro passo para qualquer cálculo.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Metodologia de Cálculo: Percentuais e Bases'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O principal mecanismo do PRODEPE é a concessão de crédito presumido do ICMS, embora também possa envolver diferimento ou financiamento em modalidades específicas. O cálculo se baseia na aplicação de percentuais sobre o ICMS de responsabilidade direta do contribuinte, apurado em cada período fiscal.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.1 Agrupamentos Industriais Prioritários'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Conforme o Art. 5º da Lei nº 11.675/1999 e Art. 5º do Decreto nº 21.959/1999, as empresas enquadradas nos agrupamentos industriais prioritários (como agroindústria, metalmecânica, eletroeletrônica, farmoquímica, bebidas, minerais não-metálicos, têxtil, plásticos) podem ser estimuladas com crédito presumido do ICMS, que observa as seguintes características:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Base de Cálculo: O ICMS de responsabilidade direta do contribuinte, apurado em cada período fiscal. Para projetos de ampliação, a base é o imposto incidente sobre a parcela do incremento da produção comercializada.',
        'B - Percentuais (Crédito Presumido):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: 'Até 75% do imposto (Art. 5º, II, Lei).',
          subItens: [] 
        },
        {
          texto: 'Até 95% em substituição ao percentual de 75%, desde que atendam a condições específicas, como:',
          subItens: [
            'C - Localização em município não integrante da Região Metropolitana do Recife (RMR) (Art. 5º, §1º, I, Lei).',
            'D - Integração em agrupamentos industriais especiais (automobilístico, farmoquímico, siderúrgico, produção de laminados de alumínio a quente, fabricação de vidros planos, metalúrgico) (Art. 5º, §1º, II, Lei).',
            'E - Adicional: A partir de 1º de maio de 2010, podem ser acrescidos dez pontos percentuais ao crédito presumido para empresas com projeto de investimentos de no mínimo R$ 100.000.000,00 e que atendam a condições definidas em decreto (Art. 5º, §20, Lei).'
          ]
        }
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.2 Demais Atividades Industriais Relevantes'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para as atividades industriais não compreendidas nos agrupamentos prioritários (Art. 6º da Lei nº 11.675/1999 e Art. 7º do Decreto nº 21.959/1999):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Base de Cálculo: O ICMS de responsabilidade direta do contribuinte, apurado em cada período fiscal. Para projetos de ampliação, a base é o imposto incidente sobre a parcela do incremento da produção comercializada.',
        'B - Percentuais (Crédito Presumido):'
      ]
    },
    {
      tipo: 'lista', 
      conteudo: [
        'Até 47,5% do ICMS (Art. 7º, I, Lei).',
        'Em substituição, pode ser concedido crédito presumido de até 75% do imposto, desde que a empresa beneficiária esteja localizada em município fora da RMR (Art. 7º, §1º, Lei).',
        'Adicional: A partir de 1º de janeiro de 2011, podem ser acrescidos dez pontos percentuais para empresas fabricantes de tintas, vernizes e afins (Art. 7º, §12, Lei).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.3 Atividade Portuária e Aeroportuária'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para importadores atacadistas de mercadorias do exterior (Art. 8º da Lei nº 11.675/1999 e Art. 9º do Decreto nº 21.959/1999):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Diferimento na Importação: Diferimento do ICMS incidente sobre a importação para a saída subsequente promovida pelo importador (Art. 9º, I, Lei).',
        'B - Crédito Presumido na Saída Subsequente:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Operações Internas: Limites que variam de 3,5% a 10% do valor da operação de importação, dependendo da carga tributária aplicável (Art. 9º, II, a, Lei).',
        'Operações Interestaduais: Limite de até 47,5% do imposto apurado (Art. 9º, II, b, Lei).',
        'Adicional: O percentual para operações interestaduais pode ser majorado em até 5 pontos percentuais com base em proposta do Comitê Diretor (Art. 9º, §6º, Lei).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.4 Central de Distribuição'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para centrais de distribuição (Art. 10º da Lei nº 11.675/1999 e Art. 10º do Decreto nº 21.959/1999):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Crédito Presumido:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        '3% do valor total das saídas interestaduais promovidas pela Central de Distribuição (Art. 10º, I, Lei).',
        '3% do valor da transferência, na entrada por transferência de mercadoria de estabelecimento industrial localizado em outra UF (Art. 10º, II, Lei).',
        'Adicional: O percentual pode ser elevado em até um ponto percentual para operações de distribuição de veículos automotores (Art. 10º, §4º, Lei).'
      ]
    }, 
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Aspectos Operacionais do Cálculo e Consolidação'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A Portaria SF nº 239/2001 estabelece diretrizes operacionais cruciais para o cálculo e a escrituração do incentivo, especialmente para empresas industriais:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Segregação de Escrituração: Empresas devem manter escrituração distinta para produtos incentivados (PI) e não incentivados, utilizando séries diferentes nos livros fiscais (Registro de Entradas, Registro de Saídas e Registro de Apuração do ICMS – RAICMS). Por exemplo, série "A" para não incentivados e "B" com subséries para PI (Portaria Inciso VII).',
        'B - Tratamento de Insumos Comuns: Para produtos que utilizam matérias-primas e insumos comuns entre PI e não PI, o contribuinte deve:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Lançar inicialmente os documentos de aquisição de uso comum nos livros de produtos não incentivados.',
        'Transferir os valores relativos ao consumo real de insumos usados na fabricação de PI para os livros de PI, mediante emissão de Nota Fiscal. A alocação deve ser baseada no consumo real ou, na impossibilidade, proporcionalmente às saídas de PI em relação às saídas totais do período fiscal (Portaria Inciso VIII).'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Apropriação de Crédito de Ativo Fixo: O crédito de ativo fixo deve ser rateado mensalmente na proporção do faturamento de PI e não PI, em relação ao total das saídas do mês (Portaria Inciso VIII, e).',
        'Cálculo para Projetos de Ampliação: A Portaria SF nº 239/2001, em seu Inciso XIV, detalha como o cálculo para projetos de ampliação deve considerar o "limite de produção a ser comercializada" ou o "limite mínimo de recolhimento do ICMS". A base para o cálculo do incentivo é o excedente da produção ou arrecadação em relação a um patamar pré-definido. Se não for atingido o limite mínimo de produção ou arrecadação, o benefício pode ser reduzido.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Exemplos Práticos de Aplicação do Cálculo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Cenário 1: Indústria Prioritária (Implantação) no Sertão Pernambucano'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Uma nova indústria de bebidas (agrupamento prioritário) se instala no Sertão Pernambucano. No primeiro mês de operação, o saldo devedor do ICMS é de R$ 500.000,00.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Percentual Aplicável: Indústria prioritária em Sertão Pernambucano = 95% (Art. 5º, §1º, I, Lei).',
        'B - Cálculo do Crédito Presumido: R$ 500.000,00 (saldo devedor) * 95% = R$ 475.000,00.',
        'C - ICMS a Recolher: R$ 500.000,00 - R$ 475.000,00 = R$ 25.000,00.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Cenário 2: Indústria Prioritária (Ampliação) na RMR'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Uma indústria metalmecânica na RMR (já existente) ampliou sua produção. Antes da ampliação, sua arrecadação média mensal de ICMS era de R$ 200.000,00. Após a ampliação, em um determinado mês, sua arrecadação de ICMS incidente sobre o incremento da produção comercializada (a parcela que excede a média anterior) foi de R$ 150.000,00. O benefício é de 75%.'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Base de Cálculo (Incremento): R$150.000,00 (ICMS sobre o incremento).',
        'Percentual Aplicável: Indústria prioritária na RMR = 75% (Art. 5º, II, Lei).',
        'Cálculo do Crédito Presumido: R$ 150.000,00 * 75% = R$ 112.500,00.',
        'ICMS Adicional a Recolher (sobre o incremento): R$150.000,00 - R$112.500,00 = R$37.500,00.'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Este valor é somado ao recolhimento do ICMS sobre a produção "normal" (base de R$200.000,00), garantindo que o Estado não perca arrecadação sobre o volume já existente.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Cenário 3: Central de Distribuição (Vendas Interestaduais)'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Uma central de distribuição promoveu R$1.000.000,00 em saídas interestaduais incentivadas em um mês.'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Percentual Aplicável: Central de Distribuição (vendas interestaduais) = 3% (Art. 10º, I, Lei).',
        'Cálculo do Crédito Presumido: R$ 1.000.000,00 * 3% = R$ 30.000,00.',
        'Impacto no ICMS a Recolher: O valor do crédito presumido é deduzido do ICMS apurado sobre as saídas interestaduais.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Considerações sobre Variações e Impactos no Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O cálculo do incentivo do PRODEPE pode variar e ser impactado por diversos fatores:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Mix de Produtos: A proporção de vendas de produtos incentivados versus não incentivados impacta diretamente a base de cálculo para a aplicação do percentual, exigindo uma segregação e controle rigorosos.',
        'B - Variação na Arrecadação: Em projetos de ampliação, a base do incentivo é o "incremento". Se o incremento não se mantiver, o valor do benefício flutua.',
        'C - Alterações Legislativas: Os percentuais e regras de cálculo podem ser alterados por novas leis e decretos, exigindo que o contribuinte esteja sempre atualizado com a legislação vigente.',
        'D - Cumprimento de Metas: A Portaria SF nº 239/2001 estabelece que o não atingimento de um limite mínimo anual de produção comercializada pode resultar na necessidade de recolher a diferença do ICMS que deveria ter sido paga, impactando o benefício líquido.',
        'E - Taxa de Administração: Embora não faça parte do cálculo do incentivo em si, a taxa de administração de 2% sobre o valor do benefício efetivamente utilizado é um custo associado que reduz o incentivo líquido. A falta de recolhimento dessa taxa pode levar à suspensão do benefício.',
        'F - Regularidade Fiscal: A manutenção da regularidade fiscal é um pré-requisito para a fruição do benefício. Qualquer irregularidade pode impedir a utilização do incentivo no período correspondente.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '6. Referências Normativas'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O cálculo do incentivo do PRODEPE é fundamentado nas seguintes normas, sendo crucial consultar suas versões mais atualizadas, incluindo as alterações e revogações:'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Lei nº 11.675, de 11 de outubro de 1999: Consolidou e alterou o PRODEPE, estabelecendo as bases dos incentivos, percentuais e condições gerais.',
        'Decreto nº 21.959, de 27 de dezembro de 1999: Regulamenta o PRODEPE, detalhando as condições e requisitos.',
        'Portaria SF nº 239, de 14 de dezembro de 2001: Estabelece os procedimentos relativos à emissão e escrituração de documentos e livros fiscais, além de aspectos operacionais do cálculo e acompanhamento de metas.'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: '',
          subItens: [
            'Art. 1º, §3º: Termos finais máximos para fruição dos incentivos.',
            'Capítulo II (Art. 4º, 5º e 7º): Detalhes sobre o estímulo à atividade industrial (prioritários e demais relevantes).',
            'Capítulo III (Art. 8º e 9º): Detalhes sobre o estímulo à atividade portuária.',
            'Capítulo IV (Art. 10º e 11º): Detalhes sobre o estímulo à Central de Distribuição.',
            'Capítulos II, III e IV (Arts. 4º a 11): Reforçam e complementam as disposições da Lei quanto aos percentuais e bases de cálculo.',
            'Inciso VII: Segregação de escrituração.',
            'Inciso VIII: Tratamento de insumos comuns.',
            'Inciso XIV: Metodologia para cálculo em projetos industriais (produção comercializada e limite mínimo de ICMS).'
          ]
        }
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A correta aplicação da metodologia de cálculo do PRODEPE exige não apenas a compreensão dos percentuais, mas também um controle fiscal e contábil rigoroso, com a segregação adequada de operações e o monitoramento constante das condições de manutenção do benefício.'
    }
    ]
  },

  {
    id: 'prodepe-lancamentos-incentivo', 
    programa: 'PRODEPE',
    titulo: 'T2: Lançamentos do Incentivo',
    descricaoHeader: 'Aprenda a refletir os valores apurados nos documentos e livros fiscais.',
    sobreTrilha: 'Esta trilha abordará como os valores do incentivo devem ser refletidos nos documentos e livros fiscais, além das obrigações acessórias.',
    urlVideo: '', 
    blocosDeConteudo: [
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Introdução e Contextualização do Tema'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A eficácia de um programa de incentivo fiscal como o PRODEPE não se manifesta apenas na concessão do benefício, mas também na sua correta e transparente aplicação no dia a dia do contribuinte. Os lançamentos do incentivo são o pilar da conformidade fiscal, traduzindo o benefício concedido em registros contábeis e fiscais que refletem a realidade da empresa e permitem a fiscalização por parte da Secretaria da Fazenda. Uma escrituração precisa é essencial para evitar sanções, como suspensão ou perda do benefício, e para garantir a segurança jurídica da operação. Esta trilha abordará como os valores apurados na Trilha 1 (Cálculo do Incentivo) devem ser refletidos nos documentos e livros fiscais, além das obrigações acessórias e as consequências de sua inobservância.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Registro dos Benefícios na Escrituração Fiscal'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O PRODEPE estabelece regras claras para a escrituração dos incentivos, visando a separação e identificação das operações incentivadas. A Portaria SF nº 239/2001 detalha os procedimentos a serem seguidos.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Categorização de Produtos: Para fins de escrituração, a Portaria SF nº 239/2001, Inciso IV, define:',
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Produto Incentivado (PI): Aquele listado no decreto concessivo.',
        'Produto Não Incentivado: Aquele não relacionado no decreto concessivo.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Documentos Fiscais: As Notas Fiscais relativas às operações de saída de PI e produtos não incentivados devem identificar os produtos por código, com a correspondente decodificação no Livro Registro de Utilização de Documentos Fiscais e Termos de Ocorrências (Inciso V). Alternativamente, podem ser usadas Notas Fiscais de séries distintas para PI e não PI (Inciso VI).',
        'C - Escrituração Segregada: Empresas industriais e centrais de distribuição devem adotar escrituração distinta, mantendo conjuntos separados dos livros fiscais.'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Livros Fiscais: Deverão ter um conjunto de Livros Registro de Entradas, Registro de Saídas e Registro de Apuração do ICMS (RAICMS) específico para:',
      ]
    },
    {
      tipo: 'lista', 
      conteudo: [
        'PI: Um conjunto para cada hipótese de benefício (crédito presumido, financiamento) e, se for o caso, para cada percentual distinto de incentivo.',
        'Produtos Não Incentivados: Um conjunto separado, quando aplicável (Inciso VII, a).'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Séries e Subséries: Os livros de produtos não incentivados utilizam a série "A". Os livros de PI utilizam a série "B", com subséries distintas para cada conjunto de livros (ex: 01, 02, etc.), iniciando com a subsérie 01 (Inciso VII, c).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'D - Lançamento no RAICMS: Os valores do crédito presumido e do financiamento devem ser totalizados e detalhados no quadro "Deduções" do RAICMS. Para indústrias, a indicação pode ser "Crédito presumido PRODEPE – indústria" ou "Financiamento PRODEPE – indústria". Para centrais de distribuição, "Crédito presumido PRODEPE sobre as entradas – central de distribuição" ou "Crédito presumido PRODEPE sobre as saídas interestaduais - central de distribuição" (Inciso VII, c, 4).',
        'E - Emissão Eletrônica (a partir de 01.01.2001): Os contribuintes beneficiários do PRODEPE são obrigados a emitir e escriturar documentos e livros fiscais por sistema eletrônico de processamento de dados (Inciso IX).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.1. Guia de Informação e Apuração do ICMS (GIAM) e Guia de Informação e Apuração de Incentivos Fiscais e Financeiros (GIAF)'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - GIAM: Deve ser apresentada uma GIAM série "A" para produtos não incentivados e uma GIAM série "B" para cada hipótese de PI, com subsérie distinta. Os incentivos de crédito presumido e financiamento devem ser informados no campo "DEDUÇÃO PARA INVESTIMENTO" do QUADRO E – APURAÇÃO DO ICMS. Para financiamentos, o QUADRO H – RECOLHIMENTO DO ICMS, detalha as parcelas dos municípios, do financiamento e remanescente do Estado (Inciso VII, d).',
        'B - GIAF: Uma GIAF (modelo no Anexo 1 da Portaria SF nº 239/2001) deve ser preenchida e entregue conjuntamente com as respectivas GIAMs, com ou sem aproveitamento do incentivo (Inciso VII, e). A GIAF detalha o cálculo do crédito presumido, as saídas incentivadas e não incentivadas, os valores do ICMS correspondentes e outras deduções.',
        'C - Documento de Arrecadação Estadual (DAE): O recolhimento dos valores apurados é feito via DAE, utilizando códigos de receita específicos (listados no Anexo 2 da Portaria), conforme a modalidade do benefício e a parcela do imposto (e.g., ICMS normal, parcela dos municípios, parcela do incentivo, parcela remanescente do Estado) (Inciso VII, f).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.2. Lançamentos Específicos para Importação Incentivada'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para o comércio importador atacadista, além das exigências gerais, há especificidades (Inciso XIII da Portaria SF nº 239/2001):'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Nota Fiscal e Declaração de Mercadoria Importada (DMI): Devem conter os dados do decreto concessivo e do cálculo do incentivo.',
        'RAICMS:',
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Para projetos com crédito presumido na importação, o campo "ICMS Mercadorias Importadas" (Quadro "Obrigações a Recolher") reflete o saldo após a dedução do crédito.',
        'Para projetos com financiamento na importação, o mesmo campo reflete o ICMS de produtos não incentivados e PI importados fora da faixa de incentivo.',
        'Para diferimento na entrada e crédito presumido na saída, adota-se um conjunto de livros fiscais específico e detalha-se o "Crédito presumido PRODEPE na saída – Importação" no quadro "Deduções".'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'GIAM: Preenchimento específico dos campos para "ICMS de Mercadorias Importadas" ou "Outros Recolhimentos", conforme o tipo de benefício (crédito presumido ou financiamento).'
      ]
    }, 
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Manutenção de Controles Internos e Extracontábeis'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A Portaria SF nº 239/2001 ressalta a importância de controles internos detalhados, que vão além da mera escrituração fiscal.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Controles Extracontábeis: O contribuinte pode, a seu critério, estabelecer controles extracontábeis de produção, comercialização, rateios e apropriações. Estes devem ser compatíveis com as condições do PRODEPE e da Portaria, para comprovar a fruição do benefício nos limites e condições fixadas no decreto concessivo (Inciso X).',
        'B - Tratamento de Insumos Comuns: Para indústrias que fabricam PI e não PI usando insumos comuns, há a exigência de rateio e transferência de valores entre os livros fiscais distintos, com base em consumo real ou proporção das saídas, detalhado em Nota Fiscal (Inciso VIII).',
        'C - Acompanhamento de Limites: Para projetos industriais e, em alguns casos, para importadores e centrais de distribuição, a empresa deve acompanhar o limite de produção a ser comercializada e o limite mínimo de recolhimento do ICMS. Isso envolve elaborar demonstrativos comparativos entre o limite estabelecido no decreto e a produção/arrecadação efetiva. A Portaria SF nº 239/2001, Inciso XIV, detalha este acompanhamento anual e as consequências se os limites não forem atingidos, podendo resultar em recolhimentos adicionais.',
        'D - Estoque de PI Não Comercializados: Ao final da fruição dos incentivos, qualquer estoque de PI não comercializado passará a ser considerado produto não incentivado para o período seguinte (Inciso XXI).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Implicações da Irregularidade nos Lançamentos e Obrigações Acessórias'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O não cumprimento das diretrizes de lançamento e das obrigações acessórias acarreta sérias consequências para o contribuinte, podendo levar à suspensão ou à perda do incentivo.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Impedimento (Suspensão) do Incentivo (Art. 16, Lei nº 11.675/1999; Art. 21-A, Decreto nº 21.959/1999): A empresa fica impedida de utilizar os incentivos se:'
      ]
    },
    {
      tipo: 'lista', 
      conteudo: [
        'Não efetuar o recolhimento integral do ICMS devido nos prazos legais (com tolerância de 5 dias). O impedimento não ocorre se o valor não recolhido for muito baixo (até 5% do incentivo utilizado, limitado a R$30.000,00 a partir de 2006).',
        'Deixar de cumprir os requisitos de habilitação.',
        'Para as Centrais de Distribuição, não alcançar o limite mínimo de recolhimento.',
        'Não efetuar o pagamento da taxa de administração.',
        'Não entregar à Secretaria da Fazenda, nos prazos, documentos de informações econômico-fiscais, arquivos magnéticos, livros e demais documentos fiscais/contábeis solicitados.',
        'Alterar as características do produto, processo produtivo ou etapas de produção sem aprovação.',
        'Reduzir a capacidade instalada ou paralisar as atividades.',
        'Promover a terceirização das atividades sem aprovação.',
        'Efeito: O impedimento implica a impossibilidade de utilizar o benefício enquanto a causa persistir, mas o prazo de fruição continua contando (Art. 16, §1º, Lei).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Perda (Cancelamento) do Incentivo (Art. 17, Lei nº 11.675/1999; Art. 22, Decreto nº 21.959/1999): A empresa perde o direito ao incentivo de forma definitiva se:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Não efetuar o recolhimento integral do ICMS devido por mais de 12 vezes (consecutivas ou não).',
        'Alterar as características do produto que fundamentou a concessão sem aprovação (até 31.12.2013).',
        'Reduzir a capacidade instalada ou paralisar as atividades (até 31.12.2013).',
        'Não iniciar a implantação do projeto no prazo.',
        'Praticar crime de sonegação fiscal (ou contra a ordem tributária a partir de 2014) após sentença transitada em julgado.',
        'Permanecer com a inscrição no CACEPE cancelada/bloqueada por mais de 3 meses consecutivos.',
        'Formalizar a renúncia ao incentivo.',
        'Estar impedida de utilizar os incentivos (nos termos do Art. 16) por mais de 12 meses, consecutivos ou não.',
        'Efeito: A perda resulta no cancelamento do benefício, restaurando o valor original do imposto, que deve ser corrigido com todos os acréscimos legais desde a data em que deveria ter sido recolhido (Art. 17, §1º, Lei). Os efeitos do cancelamento são retroativos à data do fato ensejador (Art. 17, §2º, Lei).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Regularização Espontânea: Em muitos casos, se o contribuinte regularizar a pendência (e.g., recolher o ICMS devido, entregar a declaração) antes de qualquer procedimento fiscal de ofício, a penalidade de impedimento pode ser afastada ou o benefício restabelecido (Art. 16, §2º, Lei; Art. 21-A, §2º, Decreto).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Exemplo Prático Detalhado'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Consideremos uma indústria de bebidas incentivada pelo PRODEPE na Mesorregião da Mata Pernambucana, com um crédito presumido de 90% (conforme Art. 5º, §17, I, a, 1 e 2 do Decreto). No mês de setembro de 2024, a empresa apurou um saldo devedor de ICMS de R$300.000,00 sobre seus produtos incentivados.'
    },
    {
      tipo: 'subtitulo', 
      conteudo: '1. Cálculo do Incentivo (recap da Trilha 1):'
    },
    {
      tipo: 'lista', 
      conteudo: [
        'Crédito Presumido: R$ 300.000,00 (saldo devedor) * 90% = R$ 270.000,00.',
        'ICMS a recolher (líquido do incentivo): R$300.000,00 - R$270.000,00 = R$30.000,00.'
      ]
    },
    {
      tipo: 'subtitulo',
      conteudo: '2. Lançamento na Escrituração Fiscal:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A empresa utiliza um conjunto de livros fiscais série B, subsérie 01, para seus produtos incentivados. No RAICMS (Registro de Apuração do ICMS) desta subsérie, o valor de R$270.000,00 é lançado no quadro "Deduções" com a descrição "Crédito presumido PRODEPE – indústria".'
      ]
    },
    {
      tipo: 'subtitulo',
      conteudo: '3. Preenchimento da GIAF:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A empresa preenche a GIAF (Anexo 1 da Portaria SF nº 239/2001), indicando o valor total de ICMS apurado, o valor do crédito presumido utilizado e o saldo de ICMS a recolher. A GIAF serve como um resumo do cálculo do incentivo.'
      ]
    },
    {
      tipo: 'subtitulo',
      conteudo: '4. Preenchimento da GIAM e Recolhimento do DAE:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A empresa gera a GIAM série B, subsérie 01, para o período de setembro/2024. O valor de R$270.000,00 é informado no campo "DEDUÇÃO PARA INVESTIMENTO". O ICMS a recolher de R$30.000,00 é apresentado.',
        'A empresa gera o DAE com o código de receita 005-1 (ou outro pertinente, conforme Anexo 2 da Portaria), no valor de R$30.000,00, para o recolhimento do ICMS.'
      ]
    },
    {
      tipo: 'subtitulo',
      conteudo: '5. Cálculo e Recolhimento da Taxa de Administração:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Com base no incentivo utilizado de R$ 270.000,00, a empresa deve calcular a taxa de administração de 2%: R$ 270.000,00 * 2% = R$ 5.400,00.',
        'Este valor é recolhido por DAE até o último dia útil de outubro/2024.'
      ]
    },
    {
      tipo: 'subtitulo',
      conteudo: '6. Situação de Irregularidade:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Suponha que, por um erro administrativo, a empresa não entregue a GIAF de setembro/2024. A falta de entrega da GIAF é uma obrigação acessória. A Secretaria da Fazenda, ao realizar um monitoramento, pode notificar a empresa. Se essa pendência não for regularizada, a empresa estará sujeita ao impedimento do benefício para o(s) período(s) em que a GIAF deveria ter sido entregue. Se essa irregularidade se prolongar por mais de 12 meses, a empresa poderia perder definitivamente o direito ao benefício, com a exigência retroativa do ICMS não recolhido (R$270.000,00 para setembro/2024), acrescido de multas e juros.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Este exemplo demonstra a complexidade dos lançamentos e a criticidade do cumprimento das obrigações acessórias, ressaltando que o cálculo é apenas o primeiro passo para a efetivação do benefício.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '6. Referências Oficiais'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'As informações desta trilha são fundamentadas nos seguintes documentos, conforme o "PRODEPE NORMAS E DECRETOS ATUAL":'
    },
  ]
},

  {
    id: 'prodepe-controles-suplementares', 
    programa: 'PRODEPE',
    titulo: 'T3: Controles suplementares',
    descricaoHeader: 'Entenda os controles, o monitoramento e as obrigações para a manutenção do benefício do PRODEPE.',
    sobreTrilha: 'Esta trilha aborda os controles suplementares, o monitoramento da conformidade e as consequências do descumprimento das regras do PRODEPE.',
    urlVideo: '', 
    blocosDeConteudo: [
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Introdução e Contextualização do Tema'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A concessão de incentivos fiscais pelo PRODEPE não se encerra com a publicação do decreto autorizativo. Para garantir a efetividade do programa e a correta aplicação dos recursos públicos, o Estado de Pernambuco mantém um sistema de controles suplementares abrangente. Esses controles visam monitorar a conformidade da empresa beneficiária com as condições estabelecidas, assegurar a manutenção de certos patamares de desempenho econômico e fiscal, e prever as consequências em caso de descumprimento. A gestão rigorosa desses aspectos é crucial para a continuidade da fruição do incentivo e para a segurança jurídica do contribuinte. Ignorar ou falhar nesses controles pode levar à suspensão ou perda do benefício, com exigências fiscais retroativas.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Monitoramento da Conformidade e Desempenho'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A administração do PRODEPE compreende um acompanhamento contínuo da implantação e operação do empreendimento beneficiário durante todo o período de fruição do incentivo (Decreto nº 21.959/1999, Art. 12, § 2º). Diversos órgãos do Estado compartilham responsabilidades nesse monitoramento:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - AD-DIPER (Agência de Desenvolvimento Econômico de Pernambuco): Compete à AD-DIPER supervisionar a destinação dos recursos liberados e o desempenho das empresas beneficiárias. Isso inclui a verificação da capacidade instalada de produção, a realização do investimento previsto e o acompanhamento do impacto das atividades incentivadas no desempenho da economia estadual, com relatórios semestrais sobre a repercussão nos níveis de emprego e no fomento das cadeias produtivas (Decreto nº 21.959/1999, Art. 13, IV e V).',
        'B - Secretaria da Fazenda: A Sefaz é responsável por estabelecer um controle cadastral específico das empresas beneficiárias do PRODEPE, com foco na regularidade fiscal. Implementa rotinas mensais de acompanhamento e apuração do recolhimento do ICMS, e informa trimestralmente o impacto dos benefícios na receita tributária estadual (Decreto nº 21.959/1999, Art. 14, II, III e IV).',
        'C - Comunicação de Ampliação: Caso o empreendimento apoiado pelo PRODEPE seja ampliado, o contribuinte deve comunicar essa ampliação ao Comitê Diretor do PRODEPE, por intermédio da AD-DIPER, com antecedência mínima de 30 dias, mesmo que não seja objeto de um novo pleito de incentivo (Portaria SF nº 239/2001, Inciso XXII).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Manutenção do Nível Mínimo de Arrecadação (ICMS Mínimo Anual)'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A concessão e fruição dos incentivos do PRODEPE estão condicionadas à manutenção de, no mínimo, o montante do ICMS já arrecadado pela empresa, atualizado anualmente. Esta regra aplica-se especialmente em projetos de ampliação e, no que couber, a Centrais de Distribuição e ao comércio importador atacadista (Lei nº 11.675/1999, Art. 23). A Lei Complementar nº 060/2004 detalha a sistemática de cálculo e aplicação desse montante mínimo.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Cálculo do Montante Mínimo: Para projetos de ampliação, o valor mínimo corresponde ao ICMS nominal arrecadado nos 12 meses anteriores à publicação do primeiro decreto concessivo (Lei Complementar nº 060/2004, Art. 2º, II). A Portaria SF nº 239/2001 (Inciso XVIII) especifica os códigos de receita a serem considerados para esse cálculo, que incluem o ICMS normal, antecipação tributária de responsabilidade direta, parcela dos municípios e o ICMS incidente na importação.',
        'B - Atualização Anual: O valor do montante mínimo do ICMS deve ser atualizado anualmente (Lei Complementar nº 060/2004, Art. 2º, III).',
        'C - Aferição e Consequências do Não Atingimento: Caso o contribuinte não atinja o montante mínimo, a diferença entre o imposto pago e o valor mínimo anual (limitado ao total do incentivo utilizado no período) deve ser recolhida, com acréscimos legais, e o contribuinte fica impedido de usufruir o benefício enquanto a pendência não for regularizada (Lei Complementar nº 060/2004, Art. 2º, V).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Taxa de Administração'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para fins de análise, avaliação e monitoramento dos projetos e da aplicação do incentivo, a empresa beneficiária deve recolher, a título de taxa de administração, um valor correspondente a 2% (dois por cento) do total do benefício efetivamente utilizado (Lei nº 11.675/1999, Art. 5º, § 7º; Decreto nº 21.959/1999, Art. 5º, § 9º).'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Prazo e Forma de Recolhimento: O recolhimento é mensal, por meio de Documento de Arrecadação Estadual (DAE) específico, até o último dia útil do mês subsequente ao período fiscal da efetiva utilização do benefício (Lei nº 11.675/1999, Art. 5º, § 7º).',
        'B - Consequências do Não Pagamento: A falta de pagamento da taxa de administração no vencimento é uma das hipóteses de impedimento de utilizar os incentivos (Lei nº 11.675/1999, Art. 16, IV; Decreto nº 21.959/1999, Art. 21-A, IV).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Situações de Impedimento (Suspensão) do Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A empresa incentivada fica impedida de utilizar os incentivos concedidos nas seguintes hipóteses (Lei nº 11.675/1999, Art. 16; Decreto nº 21.959/1999, Art. 21-A):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Não recolhimento do ICMS: Não efetuar o recolhimento integral do ICMS devido, a qualquer título, nos prazos legais. Há uma tolerância, sendo que o impedimento ocorre se o prazo legal for ultrapassado em 5 dias. Não se configura se o montante não recolhido for igual ou inferior a 5% do incentivo utilizado no mês (Lei nº 11.675/1999, Art. 16, I e § 3º, I e II).',
        'B - Descumprimento de Requisitos de Habilitação: Deixar de cumprir, a qualquer tempo do período de fruição, os requisitos necessários à habilitação (Lei nº 11.675/1999, Art. 16, II).',
        'C - Limite Mínimo de Recolhimento (Central de Distribuição): Para Central de Distribuição, não alcançar o limite mínimo de recolhimento previsto (Lei nº 11.675/1999, Art. 16, III).',
        'D - Não Pagamento da Taxa de Administração: (Já mencionado no item 4).',
        'E - Não Entrega de Documentos Fiscais e Arquivos Magnéticos: Não entregar à Secretaria da Fazenda, nos prazos previstos, os documentos de informações F - econômico-fiscais e os arquivos magnéticos, bem como livros e demais documentos fiscais ou contábeis quando solicitados (Lei nº 11.675/1999, Art. 16, V).',
        'F - Opção pelo Simples Nacional: Optar pela sistemática do Simples Nacional enquanto durar a opção (Lei nº 11.675/1999, Art. 16, VI).',
        'G - Alteração de Características do Produto/Processo: Alterar as características do produto, o processo produtivo ou as etapas de produção descritas no projeto econômico aprovado, sem prévia e expressa aprovação (Lei nº 11.675/1999, Art. 16, VII).',
        'H - Redução de Capacidade Instalada/Paralisação: Reduzir a capacidade instalada (em projetos de ampliação) ou paralisar as atividades do empreendimento beneficiado (Lei nº 11.675/1999, Art. 16, VIII).',
        'I - Terceirização de Atividades: Promover a terceirização de suas atividades sem prévia e expressa aprovação (Lei nº 11.675/1999, Art. 16, IX).',
        'J - Efeito do Impedimento: O impedimento acarreta a impossibilidade de utilizar o benefício durante o período em que as causas persistirem, sem prejuízo da contagem do prazo de fruição do incentivo (Lei nº 11.675/1999, Art. 16, § 1º). No entanto, em algumas hipóteses, a regularização espontânea da situação pode afastar ou convalidar o impedimento.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '6. Situações de Perda (Cancelamento) do Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A empresa perderá o direito ao incentivo concedido, resultando no seu cancelamento retroativo à data do fato que ensejou a perda, com a exigência do valor original do imposto corrigido e com acréscimos legais (Lei nº 11.675/1999, Art. 17 e § 1º; Decreto nº 21.959/1999, Art. 22 e § 1º). As hipóteses de perda incluem:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Reincidência no Não Recolhimento do ICMS: Não efetuar o recolhimento integral do ICMS devido por mais de 12 vezes (consecutivas ou não), ou por mais de 12 operações no caso de importador atacadista (Lei nº 11.675/1999, Art. 17, I).',
        'B - Alteração de Características do Produto (até 2013): Alterar as características do produto que fundamentou a concessão, sem aprovação (Lei nº 11.675/1999, Art. 17, II - redação com efeitos até 2013).',
        'C - Redução de Capacidade/Paralisação (até 2013): Reduzir a capacidade instalada (em ampliação) ou paralisar as atividades (Lei nº 11.675/1999, Art. 17, III - redação com efeitos até 2013).',
        'D - Não Início da Implantação do Projeto: Não iniciar a implantação do projeto no prazo máximo de 12 meses, contados da publicação do decreto concessivo (Lei nº 11.675/1999, Art. 17, IV).',
        'E - Crime de Sonegação Fiscal: Praticar crime de sonegação fiscal (ou contra a ordem tributária a partir de 2014), após sentença transitada em julgado (Lei nº 11.675/1999, Art. 17, V).',
        'F - Terceirização de Atividades (até 2013): Promover a terceirização de suas atividades sem aprovação (Lei nº 11.675/1999, Art. 17, VI - redação com efeitos até 2013).',
        'G - Infração de Desvio de Destino: Praticar infração que se caracterize como desvio de destino de mercadorias (Lei nº 11.675/1999, Art. 17, VII - redação com efeitos até 2013).',
        'H - Período Prolongado de Impedimento: Estar impedida de utilizar os incentivos (conforme Art. 16) por mais de 12 meses, consecutivos ou não (Lei nº 11.675/1999, Art. 17, VIII).',
        'I - Não Realização Total dos Investimentos: Não realizar a totalidade dos investimentos previstos no prazo de até 36 meses, salvo autorização para exceder o limite temporal (Lei nº 11.675/1999, Art. 17, IX).',
        'J - Inscrição CACEPE Cancelada/Bloqueada: Permanecer com a inscrição no CACEPE cancelada ou bloqueada por período superior a 3 meses consecutivos (Lei nº 11.675/1999, Art. 17, X).',
        'L - Renúncia Formal: Formalizar à Secretaria da Fazenda a renúncia ao incentivo (Lei nº 11.675/1999, Art. 17, XI).',
        'M - Efeito da Perda: O cancelamento do benefício retroage à data em que ocorreu o fato que ensejou a medida (Lei nº 11.675/1999, Art. 17, § 2º), implicando na cobrança do ICMS que deixou de ser recolhido, com os acréscimos legais cabíveis.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '7. Exemplo Prático Detalhado'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Considere uma indústria eletroeletrônica incentivada pelo PRODEPE, que opera sob o regime de crédito presumido, e que teve seu decreto concessivo publicado em 2015. Em janeiro de 2024, a empresa utilizou R$100.000,00 de crédito presumido.'
    },
    {
      tipo: 'paragrafo',
      conteudo: '1. Monitoramento da Regularidade Fiscal: A empresa possui um sistema interno que verifica mensalmente a emissão de suas Certidões Negativas de Débitos (CNDs). Em fevereiro de 2024, ao tentar emitir uma CND para um processo licitatório, é identificada uma pendência de recolhimento de um DAE de taxa judiciária de 2023, no valor de R$500,00, que estava em atraso.'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Impacto no Incentivo: Se o ICMS normal de janeiro/2024 venceu em fevereiro/2024, e a empresa não estava regular naquele dia, ela estaria impedida de utilizar os R$100.000,00 de crédito presumido de janeiro. O valor do ICMS referente a janeiro deveria ser recolhido sem o benefício.',
        'Solução: A empresa efetua o pagamento da taxa judiciária em atraso imediatamente. Após a regularização, ela pode solicitar a restituição do imposto pago a maior (caso já o tenha recolhido sem o benefício) ou reaver o direito de usar o benefício para o período, dependendo das regras específicas para convalidação. Se a pendência não fosse regularizada, o impedimento persistiria, e o benefício de R$100.000,00 para janeiro poderia ser glosado.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: '2. Manutenção do Nível Mínimo de Arrecadação: Em dezembro de 2024, a empresa totaliza seus recolhimentos de ICMS. Seu montante mínimo anual de arrecadação (definido na Lei Complementar nº 060/2004 e atualizado) é de R$1.200.000,00. Ao final do ano, ela verifica que recolheu, somando todos os códigos de receita aplicáveis, R$1.150.000,00.'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Cálculo da Diferença: R$1.200.000,00 (mínimo) - R$1.150.000,00 (recolhido) = R$50.000,00.',
        'Impacto no Incentivo: A empresa deve recolher os R$50.000,00 de diferença, com acréscimos legais, conforme estabelecido pela Lei Complementar nº 060/2004, para não ter o benefício impedido ou questionado.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: '3. Não Entrega de Arquivos Magnéticos: Durante 2024, o setor fiscal da empresa não entregou o arquivo magnético de informações econômico-fiscais referente ao período de abril.'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Impacto no Incentivo: A não entrega de arquivos magnéticos é uma hipótese de impedimento do benefício (Lei nº 11.675/1999, Art. 16, V). Se essa falha não for corrigida, e se estender por mais de 12 meses (ou seja, até abril de 2025 sem a regularização do arquivo de abril/2024), a empresa corre o risco de perder definitivamente o incentivo (Lei nº 11.675/1999, Art. 17, VIII). A perda implicaria na cobrança retroativa de todo o benefício utilizado desde abril/2024, com multas e juros.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Este exemplo demonstra a importância dos controles suplementares para a manutenção da conformidade e a garantia da fruição do incentivo.'
    }, 
    {
      tipo: 'subtitulo-bold',
      conteudo: '8. Referências Oficiais'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'As informações desta trilha são fundamentadas nos seguintes documentos, conforme o "PRODEPE NORMAS E DECRETOS ATUAL":'
    },
  ]
},

  {
    id: 'prodepe-concessao-incentivo', 
    programa: 'PRODEPE',
    titulo: 'T4: Concessão do Incentivo',
    descricaoHeader: 'Guia do processo formal de obtenção dos incentivos fiscais e financeiros do PRODEPE.',
    sobreTrilha: 'Esta trilha abrange desde a definição dos tipos de incentivo e público-alvo até as etapas de solicitação e análise.',
    urlVideo: '', 
    blocosDeConteudo: [
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Introdução e Contextualização do Tema'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Esta trilha tem como propósito guiar o usuário através do processo formal de obtenção dos incentivos fiscais e financeiros oferecidos pelo Programa de Desenvolvimento do Estado de Pernambuco (PRODEPE). O alcance desta trilha abrange desde a definição dos tipos de incentivo e público-alvo até as etapas de solicitação, análise, concessão formal e os mecanismos de monitoramento e avaliação que permeiam a vida útil do benefício. A implementação desta trilha se relaciona diretamente com as demais trilhas do PRODEPE: ela é a porta de entrada para que os conceitos de cálculo (Trilha 1), lançamentos (Trilha 2) e controles suplementares (Trilha 3) possam ser aplicados na prática, garantindo que o contribuinte compreenda o caminho para se tornar um beneficiário do programa.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'PASSO 1: DEFINIR O OBJETO DO INCENTIVO'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.1. Especifique o tipo de incentivo (crédito, dedução, isenção, etc.)'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O PRODEPE oferece principalmente incentivos na modalidade de crédito presumido do Imposto sobre Operações Relativas à Circulação de Mercadorias e sobre Prestações de Serviços de Transporte Interestadual e Intermunicipal e de Comunicação (ICMS), que atua como redutor do imposto normal devido. Para atividades específicas, como o comércio importador atacadista, há também a previsão de diferimento do ICMS (adiamento do recolhimento) e, em menor grau, o financiamento com recursos do Fundo-PRODEPE para investimentos e capital de giro, embora o foco atual seja no crédito presumido (Lei nº 11.675/1999, Art. 1º, 5º, 6º, 8º, 10º; Decreto nº 21.959/1999, Art. 1º, 5º, 6º, 8º, 10º; Portaria SF nº 239/2001, Inciso III).'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.2. Defina o público-alvo do incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O público-alvo do PRODEPE são empresas que buscam investir no Estado de Pernambuco, enquadradas nas seguintes categorias, desde que possuam sede ou filial no território pernambucano e estejam inscritas no Cadastro de Contribuintes do Estado de Pernambuco (CACEPE):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Empresas Industriais: Atuantes em diversos setores, com destaque para agrupamentos considerados prioritários ao desenvolvimento.',
        'B - Empresas Comerciais Importadoras Atacadistas de Mercadorias do Exterior: Empresas que realizam importações visando a comercialização no mercado atacadista.',
        'C - Centrais de Distribuição: Estabelecimentos que promovem operações de saída de mercadorias em grande volume, com função de distribuição (Lei nº 11.675/1999, Art. 1º, 13º; Decreto nº 21.959/1999, Art. 1º, 17º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.3. Estabeleça os critérios de elegibilidade'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A elegibilidade para o PRODEPE é diferenciada por diversos aspectos, como a natureza da atividade, a especificação dos produtos fabricados ou comercializados, a localização geográfica do empreendimento e a relevância das atividades econômicas para o desenvolvimento do Estado (Lei nº 11.675/1999, Art. 1º, §1º; Decreto nº 21.959/1999, Art. 1º, §1º).'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Critérios Específicos por Tipo de Atividade:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Empresas Industriais: Enquadramento em agrupamentos industriais prioritários (ex: agroindústria, metalmecânica, eletroeletrônica, farmoquímica, bebidas, minerais não-metálicos, têxtil) com produtos relacionados em decreto do Poder Executivo, ou em outras atividades industriais relevantes (Lei nº 11.675/1999, Art. 4º, 5º, 6º; Decreto nº 21.959/1999, Art. 4º, 5º, 6º).',
        'Comércio Importador Atacadista: Requer comprovação de não-concorrência com produtos fabricados por empresa industrial do Estado e que não haja redução do ICMS pertencente ao Estado de Pernambuco em decorrência das importações (Lei nº 11.675/1999, Art. 13º, II; Decreto nº 21.959/1999, Art. 17º, II).',
        'Centrais de Distribuição: Requer a comprovação de média mensal mínima de faturamento no semestre anterior à habilitação, e também não-concorrência com produtos fabricados por indústria local (Lei nº 11.675/1999, Art. 11º, 13º, III; Decreto nº 21.959/1999, Art. 11º, 17º, III).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Critérios por Projeto (Industrial):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Ampliação: Exigência de aumento mínimo de 20% da capacidade instalada (Lei nº 11.675/1999, Art. 14º, I; Decreto nº 21.959/1999, Art. 18º, I).',
        'Revitalização: Empreendimento paralisado por no mínimo 12 meses ininterruptos, ou declínio de pelo menos 60% no índice de utilização da capacidade instalada (Lei nº 11.675/1999, Art. 14º, II; Decreto nº 21.959/1999, Art. 18º, II).',
        'Os projetos não podem provocar redução do ICMS devido e arrecadado pela empresa em decorrência da diversificação na linha de fabricação de mercadorias não incentivadas (Lei nº 11.675/1999, Art. 14º, III; Decreto nº 21.959/1999, Art. 18º, III).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Condições Cumulativas Gerais:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Estar em situação regular perante a Fazenda Estadual em todas as obrigações tributárias (principal e acessórias).',
        'Não estar usufruindo de incentivo financeiro ou fiscal similar (com regras específicas para cumulação a partir de 2014).',
        'Não ter sócio que participe ou tenha participado de empresa em situação irregular perante a Fazenda Estadual (Lei nº 11.675/1999, Art. 15º; Decreto nº 21.959/1999, Art. 19º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'PASSO 2: ELABORAR O ROTEIRO DE CONCESSÃO'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.1. Identifique as etapas necessárias para solicitar o incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O processo de solicitação e concessão do incentivo pelo PRODEPE segue um roteiro administrativo bem definido:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Solicitação Formal: O contribuinte interessado formaliza um requerimento ao Comitê Diretor do PRODEPE, protocolizando-o junto à Agência de Desenvolvimento Econômico de Pernambuco (AD-DIPER) (Decreto nº 21.959/1999, Art. 13º, II, 20º).',
        'B - Análise Técnica: A AD-DIPER, juntamente com a Secretaria da Fazenda, emite um parecer técnico conclusivo sobre a viabilidade do projeto, a situação fiscal da empresa e o impacto nos níveis de arrecadação estadual (Decreto nº 21.959/1999, Art. 13º, III, 14º, I).',
        'C - Apreciação do Comitê Diretor: O parecer técnico é submetido ao Comitê Diretor do PRODEPE para apreciação (Decreto nº 21.959/1999, Art. 12º, I).',
        'D - Decisão Final do CONDIC: O Comitê Diretor encaminha o pleito ao Conselho de Desenvolvimento Industrial, Comercial e de Serviços (CONDIC), que proferirá a decisão final sobre a concessão (Lei nº 11.675/1999, Art. 12º, II; Decreto nº 21.959/1999, Art. 12º, II).',
        'E - Autorização por Decreto: A concessão do incentivo é autorizada por decreto do Poder Executivo (Lei nº 11.675/1999, Art. 1º, §2º; Decreto nº 21.959/1999, Art. 1º, §2º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.2. Descreva os documentos exigidos em cada etapa'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A formalização do pedido junto à AD-DIPER deve ser instruída com a seguinte documentação essencial (Decreto nº 21.959/1999, Art. 20º):'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Requerimento: Em 03 (três) vias, direcionado ao Comitê Diretor do PRODEPE.',
        'B - Atos Constitutivos: Comprobatórios da existência jurídica da empresa.',
        'C - Projeto Técnico: Contendo dados econômicos e financeiros sobre o empreendimento, além de outras informações julgadas necessárias.',
        'D - Certidão de Regularidade Fiscal: Da empresa em relação a débitos com a Fazenda Estadual.',
        'E - Certidão de Regularidade Ambiental: Fornecida pela Companhia Pernambucana do Meio Ambiente (CPRH).',
        'F - Declaração Formal: De que a empresa não usufrui de incentivo financeiro ou fiscal similar.',
        'G - Outros Documentos: Que o Comitê Diretor possa considerar necessários.',
        'H - Edital (para Importadores e Centrais de Distribuição): A empresa pleiteante deve publicar, no Diário Oficial do Estado e em jornal de grande circulação, edital específico discriminando os produtos objeto do pleito, a fim de viabilizar manifestação de fabricantes locais quanto à possível concorrência (Lei nº 11.675/1999, Art. 13º, §1º; Decreto nº 21.959/1999, Art. 17º, §1º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.3. Estabelece os prazos para cada etapa'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Parecer Técnico (AD-DIPER/SEFAZ): O parecer técnico conclusivo deve ser emitido no prazo de 30 dias, prorrogável por igual período (Decreto nº 21.959/1999, Art. 13º, III).',
        'B - Início de Fruição do Benefício: A utilização do benefício ocorre a partir do mês subsequente ao da publicação do respectivo decreto concessivo (Lei nº 11.675/1999, Art. 5º, III, 7º, III, 9º, IV, 10º, III; Decreto nº 21.959/1999, Art. 5º, III, 7º, III, 9º, IV, 10º, III).',
        'C - Prazo de Fruição: O PRODEPE concede prazos de fruição que variam de até 7 a 15 anos, dependendo da categoria da empresa e da relevância do projeto, com possibilidade de prorrogação ou renovação por igual período (Lei nº 11.675/1999, Art. 5º, III, 7º, III, 9º, IV, 10º, III).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'PASSO 3: DEFINIR OS REQUISITOS'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3.1. Liste os requisitos necessários para a concessão do incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os requisitos para a concessão são os critérios de elegibilidade detalhados no item 1.3 desta trilha, abrangendo desde a regularidade fiscal e a natureza da atividade até o capital social mínimo e a ausência de sócios com histórico de irregularidades fiscais (Lei nº 11.675/1999, Art. 13º, 14º, 15º; Decreto nº 21.959/1999, Art. 17º, 18º, 19º).'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3.2. Especifique as condições para a manutenção do incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A manutenção do incentivo é condicionada ao cumprimento contínuo de diversas obrigações e metas por parte do beneficiário. As principais incluem:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Regularidade Fiscal: Manter-se em situação regular perante a Fazenda Estadual, tanto em relação aos débitos tributários quanto às obrigações acessórias (Lei nº 11.675/1999, Art. 16º, I, II, V; Decreto nº 21.959/1999, Art. 21-A, I, II, V).',
        'B - Manutenção do ICMS Mínimo: Para projetos de ampliação, e em outras hipóteses, manter o montante do ICMS já arrecadado pela empresa, atualizado, como base mínima de recolhimento (Lei nº 11.675/1999, Art. 23º; Lei Complementar nº 060/2004, Art. 1º, 2º).',
        'C - Pagamento da Taxa de Administração: Recolher mensalmente a taxa de 2% sobre o benefício utilizado (Lei nº 11.675/1999, Art. 5º, §7º; Decreto nº 21.959/1999, Art. 5º, §9º).',
        'D - Conformidade com o Projeto: Não alterar as características do produto ou o processo produtivo e as etapas de produção descritas no projeto aprovado sem prévia autorização. Não reduzir a capacidade instalada ou paralisar as atividades (Lei nº 11.675/1999, Art. 16º, VII, VIII; Decreto nº 21.959/1999, Art. 21-A, VII, VIII).',
        'E - Não Terceirização Irregular: Não promover a terceirização das atividades sem aprovação prévia (Lei nº 11.675/1999, Art. 16º, IX; Decreto nº 21.959/1999, Art. 21-A, IX).',
        'F - Cumprimento de Investimentos: Realizar a totalidade dos investimentos previstos no projeto (Lei nº 11.675/1999, Art. 17º, IX).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3.3. Estabeleça as penalidades por não cumprimento'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O não cumprimento das condições de manutenção pode levar a duas principais consequências:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Impedimento (Suspensão): O incentivo é temporariamente bloqueado, impedindo sua utilização enquanto a irregularidade persistir. O prazo de fruição do incentivo continua a contar (Lei nº 11.675/1999, Art. 16º; Decreto nº 21.959/1999, Art. 21-A).',
        'B - Perda (Cancelamento): O direito ao incentivo é cancelado permanentemente, com efeitos retroativos à data da ocorrência do fato que gerou a perda. Isso implica na exigência do ICMS que deixou de ser recolhido devido ao benefício, com a aplicação de multas, juros e atualização monetária (Lei nº 11.675/1999, Art. 17º; Decreto nº 21.959/1999, Art. 22º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'PASSO 4: IMPLEMENTAR O PROCESSO DE CONCESSÃO'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4.1. Descreva como o processo de concessão será iniciado'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O processo é iniciado pela própria empresa interessada, mediante a protocolização do requerimento formal junto à AD-DIPER. Este requerimento deve estar acompanhado de toda a documentação comprobatória e do projeto técnico, conforme detalhado no item 2.2 desta trilha (Decreto nº 21.959/1999, Art. 13º, II, 20º).'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4.2. Explique como as informações serão coletadas e verificadas'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A coleta e verificação das informações envolvem uma atuação conjunta da AD-DIPER e da Secretaria da Fazenda:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - A AD-DIPER protocoliza o pedido e remete cópias para a Sefaz e PERPART (Decreto nº 21.959/1999, Art. 13º, II).',
        'B - A AD-DIPER e a Sefaz emitem conjuntamente o parecer técnico conclusivo, que analisa a viabilidade do projeto, a situação fiscal da empresa e o impacto na arrecadação. A Sefaz estabelece controle cadastral e rotinas de acompanhamento fiscal (Decreto nº 21.959/1999, Art. 13º, III, 14º, I, II, III).',
        'C - A Secretaria de Ciência, Tecnologia e Meio Ambiente (SECTMA) pode elaborar parecer técnico sobre a similaridade de mercadorias, para subsidiar a análise, especialmente para importadores e centrais de distribuição (Decreto nº 21.959/1999, Art. 16º, II, 17º, §1º).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4.3. Detalhe como as decisões serão tomadas e comunicadas'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'As decisões são tomadas de forma colegiada e comunicadas formalmente:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - O parecer técnico é submetido ao Comitê Diretor para apreciação, que pode solicitar a participação de outras Secretarias ou entidades (Decreto nº 21.959/1999, Art. 12º, I, §1º).',
        'B - O Comitê Diretor encaminha o pleito ao CONDIC, que proferirá a decisão final sobre a concessão (Lei nº 11.65/1999, Art. 12º, II; Decreto nº 21.959/1999, Art. 12º, II).',
        'C - A autorização é formalizada por meio de decreto do Poder Executivo, que é publicado no Diário Oficial do Estado (Lei nº 11.675/1999, Art. 1º, §2º; Decreto nº 21.959/1999, Art. 1º, §2º). A comunicação oficial da concessão se dá por essa publicação.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'PASSO 5: MONITORAR E AVALIAR O INCENTIVO'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5.1. Estabeleça métricas para avaliar a eficácia do incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A eficácia do incentivo é avaliada por métricas que refletem os objetivos do programa:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Manutenção do Nível de Arrecadação de ICMS: O programa visa garantir um montante mínimo de arrecadação mesmo com o benefício (Lei nº 11.675/1999, Art. 23º; Lei Complementar nº 060/2004).',
        'B - Impacto na Receita Tributária: Monitorado pela Sefaz por meio de relatórios trimestrais sobre os benefícios concedidos (Decreto nº 21.959/1999, Art. 14º, IV).',
        'C - Geração de Empregos: Avaliado semestralmente pela AD-DIPER (Decreto nº 21.959/1999, Art. 13º, V).',
        'D - Fomento às Cadeias Produtivas: Acompanhado pela AD-DIPER (Decreto nº 21.959/1999, Art. 13º, V).',
        'E - Realização de Investimentos: Acompanhado pela AD-DIPER, incluindo a verificação da capacidade instalada (Decreto nº 21.959/1999, Art. 13º, IV).',
        'F - Conformidade Fiscal: A regularidade fiscal contínua da empresa é um indicador de sucesso do programa (Decreto nº 21.959/1999, Art. 14º, II).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5.2. Defina como os resultados serão medidos e reportados'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os resultados são medidos por meio dos sistemas de acompanhamento dos órgãos envolvidos e reportados periodicamente:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Relatórios Semestrais: A AD-DIPER acompanha o impacto das atividades incentivadas no desempenho da economia estadual, incluindo emprego e fomento de cadeias produtivas (Decreto nº 21.959/1999, Art. 13º, V).',
        'B - Relatórios Trimestrais: A Secretaria da Fazenda informa o impacto dos benefícios concedidos na composição da receita tributária estadual (Decreto nº 21.959/1999, Art. 14º, IV).',
        'C - Aferição Anual do ICMS Mínimo: A empresa é responsável por aferir anualmente o cumprimento da exigência do montante mínimo de ICMS, com regras claras para recolhimento de diferenças (Lei Complementar nº 060/2004, Art. 2º, V).',
        'D - Monitoramento Contínuo: Os controles cadastrais e de apuração do ICMS permitem um monitoramento constante da situação do contribuinte (Decreto nº 21.959/1999, Art. 14º, II e III).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5.3. Identifique as ações corretivas para problemas identificados'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Diante de problemas ou não conformidades, o PRODEPE prevê ações corretivas que visam o restabelecimento da conformidade ou a penalização:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Suspensão (Impedimento): Em caso de irregularidades sanáveis, o benefício é suspenso temporariamente, e o contribuinte é impedido de utilizá-lo até a regularização. A Lei incentiva a autorregularização (Lei nº 11.675/1999, Art. 16º; Decreto nº 21.959/1999, Art. 21-A).',
        'B - Perda (Cancelamento): Em casos mais graves ou de reincidência, o benefício é cancelado definitivamente, com exigência retroativa do imposto não pago e aplicação de acréscimos legais (Lei nº 11.675/1999, Art. 17º; Decreto nº 21.959/1999, Art. 22º).',
        'C - Prorrogação/Renovação: Em situações específicas, e a critério do Poder Executivo, pode haver prorrogação ou renovação do prazo de fruição, mas estas estão sujeitas a condições e podem resultar em redução do incentivo (Lei nº 11.675/1999, Art. 5º, III, §15, §16; Decreto nº 21.959/1999, Art. 5º, III, §14, §15).',
        'D - Ajustes de Política: O Comitê Diretor pode decidir pela redução do incentivo em relação ao benefício original em face de mudanças na política econômica e fiscal do Estado (Lei nº 11.675/1999, Art. 5º, §16, III).'
      ]
    }
  ]
},

{
  id: 'prodeauto-calculo-incentivo', 
  programa: 'PRODEAUTO',
  titulo: 'T1: Cálculo do Incentivo',
  descricaoHeader: 'Detalha os aspectos essenciais para a apuração dos valores incentivados pelo PRODEAUTO.',
  sobreTrilha: 'Esta trilha aborda os critérios e parâmetros para o cálculo dos incentivos do PRODEAUTO, com base nas normas vigentes.',
  urlVideo: '',
  blocosDeConteudo: [
    {
      tipo: 'paragrafo',
      conteudo: 'O Programa de Desenvolvimento do Setor Automotivo do Estado de Pernambuco, conhecido como PRODEAUTO, representa um esforço estratégico do Estado para atrair e fomentar investimentos na importante cadeia produtiva do setor automotivo. Este programa oferece uma série de incentivos fiscais, principalmente na área do ICMS, buscando estimular a instalação, a expansão e a competitividade das empresas que o integram. A correta compreensão dos critérios e parâmetros para o cálculo desses incentivos é fundamental para que os contribuintes possam usufruir plenamente dos benefícios concedidos, garantindo a conformidade com a legislação e a otimização de suas operações. Esta trilha detalha os aspectos essenciais para a apuração dos valores incentivados pelo PRODEAUTO, com base nas normas vigentes.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Fundamentação Legal do PRODEAUTO'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O PRODEAUTO foi instituído pela Lei nº 13.484, de 29 de junho de 2008, que estabelece a finalidade do programa e os seus beneficiários. Esta Lei, ao longo do tempo, sofreu diversas alterações para se adaptar às dinâmicas do setor e às necessidades do Estado, sendo algumas delas por meio das Leis nº 15.166/2013, 15.183/2013, 15.505/2015 e 17.118/2020. A regulamentação da Lei é dada pelo Decreto nº 44.650, de 30 de junho de 2017, especificamente em seu Anexo 36, que detalha as disposições iniciais, credenciamento, prazos e obrigações acessórias. É importante notar que o Decreto nº 53.565, de 9 de setembro de 2022, também modificou o Decreto nº 44.650, de 2017, incorporando normas relativas ao PRODEAUTO, o que reforça a necessidade de consultar a legislação consolidada e atualizada.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Beneficiários e Tipos de Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O PRODEAUTO direciona seus incentivos a um conjunto específico de agentes do setor automotivo, com o objetivo de fomentar toda a cadeia produtiva no Estado de Pernambuco. A Lei nº 13.484/2008, em seu Art. 1º, define os contribuintes que podem ser beneficiados, e o Art. 2º elenca os incentivos fiscais aplicáveis a cada categoria.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Estabelecimentos Industriais e Comerciais Atacadistas de Veículos Nacionais ou Importados (Art. 1º, I e IV):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Crédito Presumido: Equivalente a 95% do saldo devedor do ICMS, apurado em cada período fiscal, aplicável às operações com veículos importados e mercadorias produzidas por esses estabelecimentos em Pernambuco.',
        'Diferimento do Recolhimento do ICMS na Importação de Insumos: Até 30 de abril de 2015, para insumos (exceto energia elétrica) relacionados em decreto do Poder Executivo e destinados à fabricação de veículos. A partir de 1º de maio de 2015, o diferimento sobre a importação de produtos intermediários, embalagens, partes, peças, acessórios, componentes, matérias-primas e quaisquer outros insumos (exceto baterias automotivas e energia elétrica) pode ser de 100% (se não houver similar produzido no Estado) ou variar de 42,86% a 84% (se houver similar produzido no Estado, conforme alíquota interna).',
        'Diferimento do Recolhimento do Saldo Devedor do ICMS: Para o último dia útil do centésimo mês subsequente ao do período de apuração, aplicável a mercadorias fabricadas pelos estabelecimentos em Pernambuco (a partir de 01.01.2014, alternativamente ao crédito presumido) e a veículos nacionais não fabricados pelos mencionados estabelecimentos no Estado (a partir de 01.05.2015).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Empresas Sistemistas do Setor Automotivo (Art. 1º, II):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Diferimento do ICMS: Aplicável às saídas de componentes destinados ao estabelecimento industrial de veículos (até 31.12.2014). A partir de 1º de janeiro de 2015, o diferimento incide sobre as saídas de produtos intermediários, embalagens, partes, peças, acessórios, componentes, matérias-primas e quaisquer outros insumos destinados a estabelecimento industrial de veículos. A partir de 1º de maio de 2015, o diferimento é aplicado na aquisição interna, na importação e na saída interna de insumos (exceto energia elétrica) para estabelecimentos industriais de veículos, com percentuais variando de 42,86% a 84% (conforme alíquota interna).',
        'Aproveitamento do Saldo Credor: Possibilidade de compensação com o saldo devedor de outro estabelecimento do mesmo titular em Pernambuco, ou transferência para o estabelecimento industrial de veículos.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Empresas que Produzam Bens Destinados a Integrar o Ativo Fixo do Estabelecimento Industrial de Veículos (Art. 1º, III):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Diferimento do Recolhimento do ICMS: Na aquisição interna e na importação de componentes e outros insumos (exceto energia elétrica) para utilização no processo produtivo de bens destinados a compor o ativo fixo do estabelecimento industrial de veículos.',
        'Aproveitamento do Saldo Credor: Possibilidade de aproveitamento do saldo credor porventura resultante da apuração do ICMS normal de responsabilidade direta, nos termos do benefício das sistemistas.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'D - Trading Company (Art. 1º, V): Relativamente à importação de veículos realizada por conta e ordem ou encomenda do estabelecimento atacadista, a partir de 1º de maio de 2015.'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Diferimento do Recolhimento do ICMS: Incidente na respectiva importação.',
        'Crédito Presumido: Equivalente a 80% do saldo devedor do ICMS, apurado em cada período fiscal, com condições específicas de recolhimento anual mínimo.',
        'Diferimento do Recolhimento do ICMS Incidente na Saída: Em substituição ao crédito presumido.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Metodologia de Cálculo dos Incentivos'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A metodologia de cálculo varia conforme o tipo de incentivo e o beneficiário, mas o foco está sempre na redução da carga do ICMS.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Crédito Presumido:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Fórmula Base: Valor do Incentivo = Saldo Devedor do ICMS (apurado no período fiscal) * Percentual de Crédito Presumido',
        'Para industriais e comerciais atacadistas de veículos: 95%.',
        'Para trading companies: 80%, mas com uma condição importante de recolhimento anual mínimo. O benefício não deve resultar em recolhimento anual do ICMS inferior a 2% sobre o somatório das bases de cálculo do ICMS das saídas de veículos novos (nacionais e importados) promovidas pelo atacadista contratante da importação (Lei nº 13.484/2008, Art. 2º, § 7º).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Diferimento (Parcial ou Total):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'O diferimento, em vez de ser um crédito a ser deduzido, significa que o ICMS incidente na operação é transferido para uma etapa posterior da cadeia, ou que parte dele não é recolhida na origem.',
        'Para diferimentos parciais na importação de insumos (industrial, sistemista) que têm similar em PE, os percentuais (42,86% a 84%) são aplicados sobre o valor do imposto devido na operação. Isso implica que apenas uma parte do imposto é diferida/reduzida, e a outra parte (complementar ao percentimento de diferimento) é recolhida no momento da importação.',
        'Fórmula para Diferimento Parcial: Valor do Imposto a Recolher na Origem = Valor Total do Imposto Devido - (Valor Total do Imposto Devido * Percentual de Diferimento) ou Valor do Imposto a Recolher na Origem = Valor Total do Imposto Devido * (1 - Percentual de Diferimento).',
        'O imposto diferido, em geral, será considerado incluído no imposto relativo à saída subsequente tributada, ou dispensado caso a saída subsequente não seja tributada, ou deverá ser recolhido se houver destinação diversa da mercadoria.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Transferência de Saldo Credor (Sistemistas e Produtores de Ativo Fixo):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Permite o aproveitamento do saldo credor de ICMS (resultado de entradas maiores que saídas tributadas ou não, ou de ICMS sobre ativo fixo) através de compensação com débitos de outros estabelecimentos da mesma empresa no Estado ou transferência para o estabelecimento industrial de veículos. Não é um cálculo sobre um saldo devedor, mas sim uma forma de dar vazão a um saldo positivo.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Exemplos Práticos de Cálculo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Para ilustrar a aplicação das regras de cálculo do PRODEAUTO, consideraremos alguns cenários.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Exemplo 1: Indústria de Veículos (Crédito Presumido)'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Uma indústria de veículos em Pernambuco apurou, em determinado período fiscal, um saldo devedor de ICMS de R$ 10.000.000,00 referente às operações com veículos produzidos no Estado.',
        'Cálculo do Crédito Presumido: R$ 10.000.000,00 * 95% = R$ 9.500.000,00.',
        'ICMS a Recolher: R$ 10.000.000,00 (saldo devedor) - R$ 9.500.000,00 (crédito presumido) = R$ 500.000,00.',
        'Neste caso, o incentivo resultou em uma redução de 95% do imposto a recolher sobre as operações incentivadas.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - Exemplo 2: Empresa Sistemista (Diferimento de Insumos com Similar Nacional)'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Uma empresa sistemista (beneficiária do PRODEAUTO a partir de 01.05.2015) importa um insumo essencial para a indústria automotiva. O ICMS devido na importação deste insumo é de R$100.000,00, e este possui similar produzido em Pernambuco, estando sujeito à alíquota interna de 17%.',
        'Percentual de Diferimento: Para alíquota interna de 17%, o diferimento é de 76,47% (Lei nº 13.484/2008, Art. 2º, III, d, 3).',
        'Valor do Diferimento: R$ 100.000,00 * 76,47% = R$ 76.470,00.',
        'Imposto a Recolher na Importação: R$ 100.000,00 - R$ 76.470,00 = R$ 23.530,00.',
        'O remanescente de R$ 23.530,00 seria recolhido no momento da importação. O diferimento de R$ 76.470,00 seria realizado conforme as regras de pagamento do imposto diferido, geralmente na saída subsequente.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Exemplo 3: Trading Company (Crédito Presumido com Condição de Mínimo Anual)'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Uma trading company, a partir de 01.05.2015, apurou um saldo devedor de ICMS de R$ 5.000.000,00 em um período fiscal, referente à importação e comercialização de veículos para um atacadista beneficiário.',
        'Crédito Presumido Calculado: R$ 5.000.000,00 * 80% = R$ 4.000.000,00.',
        'ICMS a Recolher (antes da verificação anual): R$ 5.000.000,00 - R$ 4.000.000,00 = R$ 1.000.000,00.'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: 'Verificação da Condição de Recolhimento Anual Mínimo: No final do exercício, o somatório das bases de cálculo do ICMS das saídas de veículos novos (nacionais e importados) promovidas pelo atacadista contratante foi de R$ 200.000.000,00.',
          subItens: [
            'Recolhimento Mínimo Exigido: R$ 200.000.000,00 * 2% = R$ 4.000.000,00.',
            'Se o total do ICMS recolhido pela trading company (somando todos os períodos fiscais do ano) for inferior a R$ 4.000.000,00, a trading terá que reduzir o crédito presumido nos períodos fiscais de janeiro a março do ano subsequente e/ou recolher a diferença em abril para atingir o mínimo exigido. Essa condição garante que o benefício não resulte em uma carga tributária inferior ao percentual mínimo estabelecido.'
          ]
        }
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Considerações Importantes e Possíveis Impactos das Normas Anexas no Cálculo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A aplicação dos incentivos do PRODEAUTO possui nuances e condições que impactam diretamente o cálculo e a fruição. É crucial estar atento a elas:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Períodos de Vigência das Alterações: O documento apresenta diversas redações anteriores para artigos da Lei nº 13.484/2008, indicando que os percentuais e as condições de cálculo podem ter variado ao longo do tempo. É essencial aplicar a regra correta para o período fiscal específico de interesse. Por exemplo, o diferimento de insumos para industriais e sistemistas sofreu mudanças significativas a partir de 01.05.2015.',
        'B - Não Cumulatividade: O Art. 3º da Lei nº 13.484/2008 estabelece que a fruição do PRODEAUTO não pode ocorrer cumulativamente com outros benefícios fiscais previstos na legislação tributária, incluindo os relativos ao PRODEPE, sobre uma mesma operação incentivada. Isso significa que, ao calcular o PRODEAUTO, a empresa não pode aplicar outro incentivo sobre a mesma parcela do ICMS.',
        'C - Conceito de Empresa Sistemista: A definição de empresa sistemista evoluiu ao longo do tempo (Art. 1º, § 1º, da Lei nº 13.484/2008), o que pode afetar a elegibilidade para certos incentivos. Antes de 31.12.2014, era limitada a fornecedores de conjuntos de componentes. A partir de 01.01.2015, expandiu-se para outros insumos, e a partir de 01.05.2015, incluiu empresas equiparadas a industrial pela legislação do IPI.',
        'D - Ativo Fixo: Os bens destinados a integrar o ativo fixo devem ser utilizados na atividade industrial, excluindo-se aqueles relacionados a atividades administrativas (Art. 1º, § 2º, Lei nº 13.484/2008). Isso delimita o escopo do diferimento para bens de capital.',
        'E - Similaridade Nacional/Estadual: Para diferimentos de 100% na importação de insumos ou veículos/peças, a inexistência de similar produzido no Estado deve ser declarada pelo importador, sob condição resolutória de comprovação posterior (Art. 2º, § 4º, Lei nº 13.484/2008). O cálculo presume a inexistência, mas a comprovação pode ser exigida.',
        'F - Taxa de Administração: As empresas que utilizam o crédito presumido devem recolher uma taxa de administração de 2% sobre o valor do crédito presumido utilizado (Lei nº 13.484/2008, Art. 4º). Embora não seja um fator de cálculo do incentivo, é um custo associado à sua fruição que deve ser considerado na análise econômica do benefício.',
        'G - Credenciamento: A fruição dos incentivos é condicionada ao credenciamento do contribuinte, conforme estabelecido em portaria do Secretário da Fazenda (Lei nº 13.484/2008, Art. 3º, I; regulamentado pelo Art. 4º do Anexo 36 do Decreto nº 44.650/2017). Sem o credenciamento, mesmo com o cálculo correto, o benefício não pode ser utilizado.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A complexidade da legislação do PRODEAUTO reside na multiplicidade de incentivos, percentuais e condições que se aplicam a diferentes beneficiários e ao longo do tempo. A análise cuidadosa do tipo de contribuinte, da natureza da operação e do período em que ela ocorre é indispensável para a correta apuração do benefício fiscal.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Referências Oficiais:'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'PORTARIA SF Nº 012, de 21.01.2003',
        'LEI Nº 13.484, DE 29 DE JUNHO DE 2008',
        'DECRETO Nº 53.565, DE 9 DE SETEMBRO DE 2022',
        'DECRETO Nº 44.650, DE 30 DE JUNHO DE 2017 – ANEXO 36 (DO PROGRAMA DE DESENVOLVIMENTO DO SETOR AUTOMOTIVO DO ESTADO DE PERNAMBUCO - PRODEAUTO)'
      ]
    }
  ]
},

  {
    id: 'prodeauto-lancamentos-incentivo', 
    programa: 'PRODEAUTO',
    titulo: 'T2: Lançamentos do Incentivo',
    descricaoHeader: 'Explore os requisitos, procedimentos e prazos essenciais para a conformidade na fruição dos benefícios.',
    sobreTrilha: 'Esta trilha aborda os procedimentos para documentar e comunicar ao Fisco a utilização dos incentivos do PRODEAUTO.',
    urlVideo: '', 
    blocosDeConteudo: [
    {
      tipo: 'paragrafo',
      conteudo: 'A efetividade dos incentivos fiscais concedidos pelo Programa de Desenvolvimento do Setor Automotivo (PRODEAUTO) depende intrinsecamente da correta aplicação e registro desses benefícios na escrituração fiscal e nas obrigações acessórias do contribuinte. Os "lançamentos do incentivo" referem-se aos procedimentos detalhados que os beneficiários devem seguir para documentar e comunicar ao Fisco a utilização dos créditos presumidos, diferimentos e outras modalidades de incentivo. Esta trilha explora os requisitos, procedimentos e prazos essenciais para garantir a conformidade e a segurança na fruição dos benefícios do PRODEAUTO.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Definição e Objetivos dos Lançamentos do Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os lançamentos do incentivo no âmbito do PRODEAUTO são os registros formais das operações incentivadas e dos valores dos benefícios fiscais utilizados na apuração do ICMS. O principal objetivo desses lançamentos é:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Materializar o Benefício: Transformar o direito ao incentivo (calculado na Trilha 1) em uma redução efetiva do imposto a recolher ou em uma postergação de seu pagamento.',
        'B - Assegurar a Conformidade Fiscal: Garantir que a utilização dos incentivos esteja em estrita aderência às normas estabelecidas, permitindo que a Secretaria da Fazenda (Sefaz) audite e valide a aplicação dos benefícios.',
        'C - Prover Transparência e Controle: Oferecer visibilidade sobre as operações incentivadas e o montante de ICMS desonerado, tanto para a empresa quanto para o órgão fiscalizador.',
        'D - Manter a Elegibilidade: O correto cumprimento das obrigações acessórias e a precisão nos lançamentos são condições fundamentais para a manutenção e a continuidade da fruição do PRODEAUTO.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O Decreto nº 44.650/2017, em seu Anexo 36, Capítulo VIII, estabelece os procedimentos específicos relativos às obrigações acessórias a que estão submetidos os beneficiários do PRODEAUTO, ressaltando que, para situações não tratadas especificamente, aplicam-se as demais disposições da legislação tributária (Anexo 36, Art. 15).'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Critérios e Requisitos para Elegibilidade dos Lançamentos'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A capacidade de realizar os lançamentos dos incentivos do PRODEAUTO está intrinsecamente ligada à elegibilidade e credenciamento prévios da empresa no programa (conforme Trilha 4: Concessão do Incentivo). Além disso, a validade dos lançamentos depende da manutenção contínua de certas condições:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Credenciamento Ativo: A empresa deve possuir credenciamento ativo no PRODEAUTO, cuja vigência é a partir da data da publicação do respectivo edital no Diário Oficial do Estado (DOE) (Anexo 36, Art. 4º, § 3º).',
        'B - Regularidade Fiscal: A empresa não deve incorrer em situações que levem ao descredenciamento, como embaraço à ação fiscal, utilização irregular de benefício ou falta de emissão de documento fiscal (Anexo 36, Art. 5º). A ocorrência de tais infrações pode invalidar os lançamentos realizados.',
        'C - Opção Formal pelo Diferimento do Saldo Devedor: Para empresas que optam pelo diferimento do recolhimento do saldo devedor do ICMS (alternativamente ao crédito presumido), a opção deve ser formalizada até o dia 15 do mês relativo à opção, por comunicação à Sefaz. Esta opção permanece válida para os períodos subsequentes até nova manifestação (Anexo 36, Art. 11).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Procedimentos para Inscrição e Acompanhamento nos Lançamentos'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A inscrição para o PRODEAUTO é um processo de credenciamento (Trilha 4), mas os lançamentos do incentivo requerem um acompanhamento contínuo da apuração e registro das operações.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Escrituração por EFD - ICMS/IPI: Os estabelecimentos industriais de veículos, os estabelecimentos comerciais atacadistas de veículos, o estabelecimento industrial pertencente à mesma pessoa jurídica do industrial de veículos, e a trading company (nas operações com veículos automotores importados por conta e ordem ou encomenda do atacadista) devem realizar a escrituração fiscal por meio da EFD - ICMS/IPI (Anexo 36, Art. 26, I).',
        'B - Separação das Apurações: É obrigatório adotar controle adicional para separar a apuração do imposto em tantas apurações quantos forem os benefícios fiscais utilizados, especificamente em relação ao PRODEAUTO, bem como as operações não contempladas com o benefício (Anexo 36, Art. 26, I).',
        'C - Relatório Específico de Controle: O contribuinte deve manter, durante o prazo decadencial, um relatório específico para o controle de cada hipótese de benefício (crédito presumido, diferimento), bem como de outras operações, quando aplicável (Anexo 36, Art. 26, II).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Detalhamento dos Lançamentos Específicos por Tipo de Benefício'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O Anexo 36 do Decreto nº 44.650/2017, em sua Seção V do Capítulo VIII, detalha minuciosamente como os diferentes incentivos do PRODEAUTO devem ser registrados na EFD-ICMS/IPI.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - 4.1. Lançamento do Crédito Presumido (Industrial, Comercial Atacadista, Trading Company):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'O valor do crédito presumido utilizado deve ser lançado no Registro E111 (Ajuste/Benefício/Incentivo da Apuração do ICMS).',
        'Deve-se utilizar o código de ajuste da apuração e dedução PE040015 (Anexo 36, Art. 26, III, b).',
        'Apropriação do Crédito Fiscal: Em geral, o crédito fiscal (de entrada) deve ser apropriado rateando-o com base no consumo real dos insumos ou, na impossibilidade, na proporção do débito do imposto das saídas tributadas. Essa proporcionalidade também se aplica ao ativo permanente e aos créditos recebidos por transferência (Anexo 36, Art. 26, III, a).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - 4.2. Lançamento do Diferimento do Recolhimento do Saldo Devedor (Industrial, Comercial Atacadista):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Estorno do Débito: O contribuinte deve fazer o estorno do débito no Registro E111.',
        'Utilizar os códigos de ajuste PE030099 (com a descrição complementar "Diferimento do recolhimento do saldo devedor do ICMS") e PE059999 (com a descrição complementar "Saldo devedor do ICMS diferido") (Anexo 36, Art. 26, III, c, 1).',
        'Registro da Obrigação a Recolher: O valor estornado deve ser lançado no Registro E116 (Obrigações do ICMS Recolhido ou a Recolher - Operações Próprias).',
        'Informar como código da obrigação a recolher o valor 000.',
        'Como data de vencimento, o último dia útil do centésimo mês subsequente ao do respectivo período de apuração do imposto.',
        'O código de receita a ser utilizado é 0434 ("ICMS - recolhimento especial").',
        'O campo “TXT_COMPL” (texto complementar) deve ser preenchido com a expressão: “diferimento do recolhimento do saldo devedor 100 (cem) meses - Prodeauto” (Anexo 36, Art. 26, III, c, 2).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - 4.3. Lançamento da Transferência de Saldo Credor (Sistemistas para Industrial de Veículos):'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Pela Empresa Sistemista (Transferidora):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Emitir NF-e de saída com item "transferência de saldo credor - Prodeauto" (Anexo 36, Art. 27, I, a).',
        'Registrar a NF-e sem valores e informar o valor do saldo credor transferido nas observações do lançamento fiscal (registro C195) (Anexo 36, Art. 27, I, b, 1).',
        'Registrar o saldo credor transferido no Registro E111, utilizando o código de ajuste PE000007, e informando na descrição complementar do ajuste o número da NF-e (Anexo 36, Art. 27, I, b, 2).'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Pelo Estabelecimento Industrial de Veículos (Recebedor):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Registrar a NF-e de transferência sem valores e informar o valor do saldo credor recebido nas observações do lançamento fiscal (registro C195) (Anexo 36, Art. 27, II, a).',
        'Registrar o saldo credor recebido no Registro E111, utilizando o código de ajuste PE020015, e informando na descrição complementar do ajuste o número da NF-e (Anexo 36, Art. 27, II, b).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Outras Obrigações e Procedimentos de Documentação'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Taxa de Administração: O recolhimento da taxa de administração (2% sobre o crédito presumido utilizado) deve ser efetuado mensalmente, por meio de DAE modelo 20, sob o código de receita 476-2, até o último dia útil do mês subsequente ao do período fiscal da utilização do benefício (Anexo 36, Art. 12).'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: 'B - Importação e Diferimento:',
          subItens: [
            'A dispensa da emissão da Declaração de Mercadoria Importada (DMI) e do documento fiscal de entrada para a quantidade total importada requer credenciamento (Anexo 36, Art. 16, I e II).',
            'O contribuinte credenciado deve realizar o transporte da mercadoria acompanhado da DI e do documento fiscal de entrada parcial, indicando na NF-e o número e data da DI, e apresentar um relatório mensal das importações dispensadas da DMI (Anexo 36, Art. 16, § 2º).',
            'Para transporte parcelado de mercadoria importada, a emissão de NF-e de entrada para cada parcela deve observar o conteúdo do container/unidade, indicar número/data da DI e valores dos tributos correspondentes à parcela (Anexo 36, Art. 17).'
          ]
        }
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - Depósito Fechado Vinculado: Estabelecimentos industriais de veículos com depósito fechado dispensado de inscrição no Cacepe devem emitir documentos fiscais específicos para a circulação da mercadoria (do desembaraço ao depósito, remessa simbólica, e movimentações entre depósito e estabelecimento industrial) (Anexo 36, Art. 18).',
        'D - Remessa e Retorno de Insumos/Ativo Fixo para Industrialização por Terceiros: A suspensão da exigência do imposto e o retorno de insumos/bens de ativo permanente devem ser acobertados por documento fiscal de entrada e conter indicação da base legal (Anexo 36, Art. 20).',
        'E - Emissão de Documentos Fiscais para Correção de Lançamento: Autorizada a emissão de documento fiscal de saída para correção de registro de lançamento, com indicação do motivo e que a operação não gera crédito para o destinatário. DAE específico para diferença de imposto (Anexo 36, Art. 22). Também para devolução simbólica em caso de registro a maior (Anexo 36, Art. 23).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'F - Dispensa de Emissão de Documento Fiscal (Remessas Diárias/Controle Interno):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Para remessas diárias de partes/peças/componentes por fornecedores do parque, a emissão de NF-e pode ser dispensada, desde que o faturamento correspondente seja diário e uma NF-e que englobe as remessas seja emitida até o final do dia útil seguinte ao término da montagem do veículo (Anexo 36, Art. 25, I).',
        'Pode ser dispensada a emissão de documento fiscal na remessa de embalagens que componham o ativo permanente, desde que não haja circulação em via pública (Anexo 36, Art. 25, II).',
        'O controle de veículos para testes e provas de engenharia pode ser feito por documento de controle interno ("Controle de Remessa/Retorno de Veículos para Testes e Provas de Engenharia") em substituição à NF-e (Anexo 36, Art. 24).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '6. Prazos e Vigências Importantes'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os prazos são cruciais para a validade dos lançamentos:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Opção pelo Diferimento do Saldo Devedor: Até o dia 15 do mês relativo à opção (Anexo 36, Art. 11).',
        'B - Recolhimento da Taxa de Administração: Mensalmente, até o último dia útil do mês subsequente ao período fiscal da utilização do benefício (Anexo 36, Art. 12).',
        'C - Transmissão da EFD-ICMS/IPI: Segue os prazos gerais da legislação (não especificados no Anexo 36, mas regidos por outras normas da Sefaz-PE).',
        'D - Relatório Mensal de Importações Dispensa DMI: Até o dia 15 do mês subsequente ao da realização das importações (Anexo 36, Art. 16, § 2º, III).',
        'E - Recolhimento de ICMS Antecipado (Anexo 37): Em geral, até o dia 9 do mês subsequente ao da saída da mercadoria do estabelecimento do contribuinte substituto, ou no momento da importação, conforme a operação (Anexo 37, Art. 12).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Exemplo Prático: Lançamento de Crédito Presumido e Diferimento na EFD-ICMS/IPI'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Uma indústria de veículos (CNPJ: XX.XXX.XXX/XXXX-XX) beneficiária do PRODEAUTO, apurou em um mês:'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'Saldo Devedor de ICMS (apuração normal): R$ 8.000.000,00.',
        'Crédito Presumido do PRODEAUTO (95% sobre o saldo devedor): R$ 7.600.000,00.',
        'ICMS a recolher (líquido do crédito presumido): R$ 400.000,00.',
        'Parte do saldo devedor de ICMS (referente a veículos nacionais não fabricados no Estado, onde optou pelo diferimento para 100 meses): R$ 1.000.000,00.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Procedimentos na EFD-ICMS/IPI:'
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: '1. Registro do Crédito Presumido:',
          subItens: [
            'No Registro E111 (Ajuste/Benefício/Incentivo da Apuração do ICMS), será lançado:'
          ]
        }
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        {
          texto: '', 
          subItens: [
            'COD_AJ_APUR: PE040015',
            'DESCR_COMPL_AJ: Crédito Presumido PRODEAUTO - Art. 2, I, a) Lei 13.484/2008',
            'VL_AJ_APUR: 7.600.000,00 (valor do crédito presumido)'
          ]
        }
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Registro do Diferimento do Saldo Devedor:'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'No Registro E111 (Ajuste/Benefício/Incentivo da Apuração do ICMS), será lançado:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'COD_AJ_APUR: PE030099',
        'DESCR_COMPL_AJ: Diferimento do recolhimento do saldo devedor do ICMS',
        'VL_AJ_APUR: 1.000.000,00 (valor diferido)',
        'COD_AJ_APUR: PE059999',
        'DESCR_COMPL_AJ: Saldo devedor do ICMS diferido',
        'VL_AJ_APUR: 1.000.000,00 (valor diferido)'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'No Registro E116 (Obrigações do ICMS Recolhido ou a Recolher - Operações Próprias), será detalhada a obrigação diferida:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'COD_OR: 000 (código de obrigação padrão para diferimento)',
        'VL_OR: 1.000.000,00 (valor diferido)',
        'DT_VCTO: Último dia útil do 100º mês subsequente (ex: 31/01/2033 se a apuração foi em maio/2024)',
        'COD_REC: 0434 (ICMS - recolhimento especial)',
        'TXT_COMPL: diferimento do recolhimento do saldo devedor 100 (cem) meses - Prodeauto'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Resultado da Apuração: O total de ICMS a recolher na apuração do período será R$400.000,00, e a empresa terá uma obrigação de longo prazo registrada para o ICMS diferido.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A complexidade dos lançamentos do PRODEAUTO demanda sistemas fiscais robustos e equipes bem treinadas para garantir a exatidão e a conformidade, evitando assim futuras autuações e glosas.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '7. Referências Oficiais'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        'LEI Nº 13.484, DE 29 DE JUNHO DE 2008',
        'DECRETO Nº 44.650, DE 30 DE JUNHO DE 2017 – ANEXO 36 (especialmente Capítulo VIII: Das Obrigações Acessórias Específicas, Seção V: Das Demais Obrigações Acessórias Específicas, Art. 26 e Art. 27).',
        'DECRETO Nº 44.650, DE 30 DE JUNHO DE 2017 – ANEXO 37 (especialmente Art. 12: Do Recolhimento do Imposto, e Art. 33: Da Escrituração Fiscal).',
        'DECRETO Nº 53.565, DE 9 DE SETEMBRO DE 2022 (Modifica o Decreto nº 44.650, de 2017).'
      ]
    }
  ]
},
  {
    id: 'prodeauto-controles-suplementares', 
    programa: 'PRODEAUTO',
    titulo: 'T3: Controles suplementare',
    descricaoHeader: 'Entenda os mecanismos de acompanhamento, fiscalização e avaliação do PRODEAUTO.',
    sobreTrilha: 'Esta trilha detalha as responsabilidades do contribuinte e as prerrogativas do Fisco para a manutenção do benefício.',
    urlVideo: '', 
    blocosDeConteudo: [
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Introdução aos Controles Suplementares no PRODEAUTO'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A concessão de incentivos fiscais pelo Programa de Desenvolvimento do Setor Automotivo (PRODEAUTO) não se limita à sua autorização formal. Para assegurar a correta aplicação dos benefícios e o cumprimento dos objetivos do programa, o Estado de Pernambuco institui uma série de controles suplementares. Estes controles são mecanismos de acompanhamento contínuo, fiscalização e avaliação que visam garantir a conformidade fiscal do contribuinte, a aderência às condições específicas do benefício e a transparência das operações incentivadas. A importância desses controles reside na proteção da arrecadação estadual, na promoção da justiça fiscal e na manutenção da credibilidade do programa. Para o contribuinte, a atenção e a gestão eficaz desses controles são cruciais para a manutenção do benefício e para evitar sanções que podem variar desde o impedimento temporário da fruição até a perda definitiva do incentivo.'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O Decreto nº 44.650, de 30 de junho de 2017, em seu Anexo 36, que regulamenta o PRODEAUTO, e a Lei nº 13.484, de 29 de junho de 2008, estabelecem as bases para esses controles, detalhando as responsabilidades do contribuinte e as prerrogativas do Fisco.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Tipos de Controles Suplementares Aplicáveis'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os controles suplementares do PRODEAUTO abrangem diversas dimensões da operação do contribuinte, desde a conduta fiscal até a gestão operacional e a apresentação de informações.'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - 2.1. Controle de Conduta Fiscal e Compliance:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Credenciamento e Descredenciamento: A fruição dos incentivos é condicionada ao credenciamento do contribuinte. O descredenciamento, por exemplo, ocorre quando há embaraço à ação fiscal, utilização irregular de qualquer benefício fiscal concedido, ou falta de emissão de documento fiscal (Anexo 36, Art. 5º). A manutenção do credenciamento ativo é um controle fundamental de compliance.',
        'Recredenciamento: A possibilidade de recredenciamento exige a comprovação do saneamento das situações que motivaram o descredenciamento (Anexo 36, Art. 6º), funcionando como um controle de regularização.'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'B - 2.2. Controle de Desempenho Financeiro e Metas:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Recolhimento Anual Mínimo (Trading Company): O crédito presumido concedido à trading company (80% do saldo deovedor) é condicionado a que o recolhimento anual do ICMS não seja inferior a 2% sobre o somatório dos valores das bases de cálculo do ICMS das saídas de veículos novos realizadas pelo estabelecimento atacadista contratante da importação. Caso o recolhimento seja inferior, a trading company deve reduzir o valor do crédito presumido nos primeiros meses do ano subsequente e/ou recolher a diferença em abril, a título de complementação (Lei nº 13.484/2008, Art. 2º, § 7º). Este é um controle de performance fiscal.',
        'Comprovação de Inexistência de Similar: Para casos de diferimento de 100% na importação de insumos ou veículos/peças, a inexistência de similar produzido no Estado deve ser declarada pelo importador, sob condição resolutória de comprovação posterior, quando solicitada (Lei nº 13.484/2008, Art. 2º, § 4º).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'C - 2.3. Controles Operacionais e de Medição:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Aferição de Consumo por Medidores (Sistemista): A apropriação do crédito fiscal de ICMS sobre a aquisição de energia elétrica e gás natural por sistemistas localizadas em área contígua à indústria de veículos é condicionada à instalação de medidores que possibilitem a aferição do consumo de cada sistemista (Anexo 36, Art. 14, II).',
        'Identificação de Espaço e Estoques em Parques de Fornecedores: A permissão para instalação de parques de fornecedores em área contígua à indústria de veículos exige que o espaço que ocupa cada estabelecimento da empresa fornecedora, bem como seu ativo permanente e estoques, sejam identificáveis (Anexo 36, Art. 21, II).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'D - 2.4. Controles de Relatoria e Dados:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Relatório Mensal de Importações com Dispensa de DMI: Contribuintes credenciados para dispensa de DMI e NF de entrada em importações devem apresentar, em meio eletrônico, um relatório referente às importações efetuadas no mês anterior, com informações detalhadas, até o dia 15 do mês subsequente (Anexo 36, Art. 16, § 2º, III).',
        'Escrituração Segregada e Relatórios Específicos: A empresa deve realizar a escrituração por meio da EFD - ICMS/IPI e adotar controle adicional para separar a apuração do imposto por benefício fiscal e operações não incentivadas. Deve-se manter relatório específico para controle de cada hipótese de benefício (Anexo 36, Art. 26, I e II).',
        'Comunicação Mensal de Opção por Diferimento: A opção pelo diferimento do recolhimento do saldo devedor do imposto deve ser manifestada mensalmente por comunicação à Sefaz (Anexo 36, Art. 11, I).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'E - 2.5. Controles Documentais e Procedimentais:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Correção de Lançamentos: Emissão de documento fiscal pelo industrial de veículos para correção de registro de lançamento, com indicação de motivo e de que não gera crédito ao destinatário, e recolhimento de DAE específico com acréscimos legais se for o caso (Anexo 36, Art. 22).',
        'Devolução Simbólica: Emissão de documento fiscal de devolução simbólica para registro de documento fiscal com valor ou quantidade superior ao da efetiva operação (Anexo 36, Art. 23).',
        'Controle Interno para Testes de Veículos: Utilização de documento de controle interno denominado “Controle de Remessa/Retorno de Veículos para Testes e Provas de Engenharia” em substituição à NF-e para essa finalidade (Anexo 36, Art. 24).',
        'Consolidação de Remessas: Dispensa da emissão de documento fiscal a cada remessa de partes/peças por fornecedores contíguos, permitindo faturamento diário consolidado (Anexo 36, Art. 25, I).',
        'Transferência de Saldo Credor: Detalhamento de emissão de NF-e e registros na EFD-ICMS/IPI para a transferência de saldo credor de sistemistas para o industrial de veículos (Anexo 36, Art. 27).'
      ]
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'F - 2.6. Controle de Custos de Fiscalização:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Taxa de Administração: O recolhimento da taxa de administração (2% do valor do crédito presumido utilizado) para o Fundo de Desenvolvimento do Estado de Pernambuco (FURPE) visa cobrir os custos de controle e acompanhamento dos incentivos (Lei nº 13.484/2008, Art. 4º; Anexo 36, Art. 12).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Normas e Regulamentações Relevantes'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os controles suplementares no PRODEAUTO são fundamentados principalmente na:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Lei nº 13.484, de 29 de junho de 2008: Que institui o PRODEAUTO e estabelece as diretrizes gerais, incluindo as condições de fruição, a taxa de administração e a base para os cálculos de mínimos anuais (Art. 2º, § 4º, § 7º; Art. 3º; Art. 4º).',
        'B - Decreto nº 44.650, de 30 de junho de 2017 – Anexo 36 (DO PROGRAMA DE DESENVOLVIMENTO DO SETOR AUTOMOTIVO DO ESTADO DE PERNAMBUCO - PRODEAUTO): Este é o principal documento regulamentador dos controles, detalhando as condições para credenciamento e descredenciamento (Capítulo II), a contagem de prazos (Capítulo III), a prorrogação de incentivos (Capítulo IV), a opção pelo diferimento (Capítulo V), a taxa de administração (Capítulo VI), e, principalmente, as obrigações acessórias específicas (Capítulo VIII). Este último capítulo é a base para a maioria dos controles de relatoria, escrituração e documentação.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Essas regulamentações impactam a implementação dos controles ao:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Definir Obrigações: Clarificam o que o contribuinte deve fazer em termos de relatórios, registros e procedimentos.',
        'B - Estabelecer Consequências: Associam o não cumprimento dos controles a penalidades (descredenciamento, exigência de recolhimentos complementares).',
        'C - Fornecer Parâmetros de Avaliação: Indicam as métricas que serão utilizadas pelo Fisco para verificar a conformidade e a performance do beneficiário.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Implementação e Gestão dos Controles Suplementares'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A implementação eficaz dos controles suplementares no contexto do PRODEAUTO requer uma abordagem sistêmica e proativa por parte do contribuinte.'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Passos Práticos para Implementação:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Credenciamento Inicial: Assegurar que todos os requisitos do Anexo 36, Art. 4º para credenciamento sejam atendidos e mantidos continuamente.',
        'B - Sistemas de Escrituração Fiscal: Utilizar sistemas ERP e fiscais capazes de realizar a escrituração por EFD - ICMS/IPI e, crucialmente, de separar as apurações por benefício fiscal e operações não incentivadas (Anexo 36, Art. 26, I).',
        'C - Desenvolvimento de Relatórios Internos: Criar e manter relatórios específicos de controle para cada hipótese de benefício, detalhando os cálculos, saldos e bases para fiscalização (Anexo 36, Art. 26, II).',
        'D - Processos de Medição e Aferição: Implementar rotinas para aferição de consumo (e.g., por medidores, para sistemistas - Anexo 36, Art. 14, II) e identificação de ativos e estoques em parques de fornecedores (Anexo 36, Art. 21, II).',
        'E - Rotinas de Geração de Relatórios Periódicos: Estabelecer procedimentos para a geração e envio de relatórios mensais de importações com dispensa de DMI (Anexo 36, Art. 16, § 2º, III) e comunicação mensal de opção por diferimento (Anexo 36, Art. 11, I).',
        'F - Gerenciamento da Taxa de Administração: Integrar o cálculo e o recolhimento da taxa de administração no fluxo mensal de obrigações fiscais (Anexo 36, Art. 12).',
        'G - Controles de Documentação: Adotar procedimentos para emissão e registro de NF-e para correções de lançamento e devoluções simbólicas (Anexo 36, Art. 22 e 23), e para a transferência de saldo credor (Anexo 36, Art. 27).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Melhores Práticas para Gestão Contínua e Atualização:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Auditorias Internas Periódicas: Realizar revisões regulares dos processos de cálculo e lançamento dos incentivos, verificando a conformidade com a legislação e as próprias normas internas da empresa.',
        'B - Monitoramento da Legislação: Acompanhar ativamente as alterações nas leis, decretos e portarias que regem o PRODEAUTO, garantindo que os controles internos sejam atualizados.',
        'C - Treinamento da Equipe: Assegurar que a equipe responsável pelos processos fiscais e contábeis esteja atualizada e bem treinada nas especificidades do PRODEAUTO e seus controles.',
        'D - Conciliação Frequente: Realizar conciliações regulares entre os dados do ERP, os livros fiscais e as declarações enviadas (EFD-ICMS/IPI), bem como os relatórios específicos exigidos.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '5. Desafios e Considerações na Aplicação dos Controles Suplementares'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A implementação e gestão dos controles suplementares no PRODEAUTO podem apresentar desafios, mas o documento fornece insights sobre como abordá-los.'
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        '5.1. Desafios Comuns:'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Complexidade da Segregação de Informações: A exigência de separar apurações por benefício fiscal e operações não incentivadas (Anexo 36, Art. 26, I) pode ser complexa para empresas com grande volume de operações e mix de produtos.',
        'Controle de Condições Variáveis: A declaração e comprovação posterior da inexistência de similar (Lei nº 13.484/2008, Art. 2º, § 4º) impõe um risco de fiscalização posterior, exigindo um controle documental robusto.',
        'Monitoramento de Mínimos Anuais: Para trading companies, o controle do recolhimento anual mínimo de 2% (Lei nº 13.484/2008, Art. 2º, § 7º) exige uma projeção e acompanhamento financeiro que vai além da apuração mensal, podendo exigir ajustes nos meses seguintes.',
        'Manutenção da Regularidade: A exigência de não incorrer em embaraço à ação fiscal, utilização irregular de benefício ou falta de emissão de documento fiscal (Anexo 36, Art. 5º) demanda uma cultura de compliance e sistemas operacionais eficazes.',
        'Precisão em Dados Operacionais: A necessidade de aferição de consumo por medidores e identificação de espaço/estoques (Anexo 36, Art. 14, II; Art. 21, II) exige integração entre o controle fiscal e as operações físicas da empresa.'
      ]
    },
    {
      tipo: 'lista-bullet',
      conteudo: [
        '5.2. Estratégias para Superar Desafios (Implícitas no Arquivo):'
      ]
    },
    {
      tipo: 'lista',
      conteudo: [
        'Investimento em Tecnologia: Sistemas de gestão (ERP) e fiscais que permitam a segregação automática dos dados por operação incentivada/não incentivada, geração da EFD-ICMS/IPI com os ajustes corretos e produção dos relatórios específicos.',
        'Padronização de Processos Internos: A definição de procedimentos claros para emissão e registro de NF-e, para correção de lançamentos ou devoluções simbólicas, ajuda a padronizar o comportamento fiscal (Anexo 36, Art. 22 e 23).',
        'Engajamento Interdepartamental: A exigência de identificação de espaço, ativo permanente e estoques em parques de fornecedores (Anexo 36, Art. 21, II) e aferição de consumo (Anexo 36, Art. 14, II) sugere a necessidade de forte colaboração entre os departamentos fiscal, contábil, operacional e de engenharia.',
        'Auditoria e Autocorreção: A permissão para correção de lançamentos e devoluções simbólicas (Anexo 36, Art. 22 e 23) incentiva a empresa a identificar e corrigir proativamente suas próprias inconsistências antes de uma ação fiscal.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '6. Conclusão e Recomendações Finais'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Os controles suplementares do PRODEAUTO são o cerne da gestão do incentivo fiscal, indo muito além do cálculo e do lançamento inicial. Eles representam um conjunto robusto de mecanismos que visam garantir a conformidade do contribuinte com a política de desenvolvimento do Estado de Pernambuco e assegurar a sustentabilidade do programa. A legislação do PRODEAUTO, especialmente o Anexo 36 do Decreto nº 44.650/2017, detalha as exigências para o credenciamento, a escrituração, a relatoria de dados operacionais e o cumprimento de metas de performance.'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A implementação e gestão eficazes desses controles são desafios complexos, exigindo do contribuinte um investimento contínuo em tecnologia, processos e capacitação de pessoal. Falhas na aplicação desses controles podem levar a penalidades severas, como o descredenciamento e a perda retroativa do incentivo, resultando em altos custos fiscais e jurídicos.'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Recomendações:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Investir em Sistemas Fiscais Integrados: Para automatizar a segregação de apurações e a geração dos relatórios específicos, minimizando erros manuais.',
        'B - Estabelecer um Programa de Compliance Fiscal: Que inclua treinamentos periódicos, auditorias internas, e monitoramento contínuo da regularidade fiscal e das condições do benefício.',
        'C - Manter Diálogo Constante com a Sefaz: Para esclarecer dúvidas sobre a interpretação das normas e as expectativas de fiscalização.',
        'D - Focar na Precisão dos Dados: Desde a entrada de insumos até a saída do produto final, a integridade e precisão dos dados são a base para a conformidade com os controles suplementares.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A gestão diligente dos controles suplementares do PRODEAUTO não é apenas uma obrigação legal, mas uma estratégia essencial para maximizar o valor do benefício fiscal e assegurar a longevidade e a previsibilidade das operações incentivadas.'
    },
  ]
},

  {
    id: 'prodeauto-concessao-incentivo', 
    programa: 'PRODEAUTO',
    titulo: 'T4: Concessão do Incentivo',
    descricaoHeader: 'Detalha os critérios, procedimentos e a fundamentação legal que regem a concessão do incentivo.',
    sobreTrilha: 'Esta trilha guia o usuário através do processo formal de obtenção dos incentivos fiscais do PRODEAUTO.',
    urlVideo: '',
    blocosDeConteudo: [
    {
      tipo: 'paragrafo',
      conteudo: 'A concessão do incentivo fiscal pelo Programa de Desenvolvimento do Setor Automotivo (PRODEAUTO) é o ato formal que habilita uma empresa a usufruir dos benefícios fiscais previstos na Lei nº 13.484/2008 e em seus regulamentos. Este processo é fundamental para garantir que apenas os empreendimentos que atendam aos requisitos e objetivos de desenvolvimento do Estado sejam incentivados. Esta trilha detalha os critérios, procedimentos e a fundamentação legal que regem a concessão do incentivo no âmbito do PRODEAUTO, com base nas informações contidas no documento "PRODEAUTO NORMAS DECRETOS PORTARIAS ATUAL".'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Critérios e Condições para a Concessão do Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A fruição dos incentivos do PRODEAUTO está condicionada ao atendimento de requisitos específicos, que garantem a elegibilidade do contribuinte. O principal critério formal para a concessão é o credenciamento, conforme previsto no Art. 3º, inciso I, da Lei nº 13.484/2008. O Anexo 36 do Decreto nº 44.650/2017 detalha as condições para esse credenciamento:'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.1. Cumprimento de Condições Gerais de Credenciamento (Art. 4º, I, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O contribuinte deve cumprir as condições previstas no Art. 272 do Decreto (não detalhado no texto fornecido para o Anexo 36, mas implicado como requisito geral de regularidade), com exceções específicas:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Dispensa da condição de não possuir ação pendente de julgamento contra o recolhimento do ICMS, quando a sentença for favorável ao contribuinte.',
        'Dispensa da condição de não ter sócio que participe de empresa em situação irregular perante a Fazenda.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.2. Inscrição no CACEPE (Art. 4º, II, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O contribuinte deve estar inscrito no Cadastro de Contribuintes do Estado de Pernambuco (CACEPE) no regime normal de apuração do imposto. A atividade econômica principal deve ser de indústria ou comércio atacadista de veículos nacionais ou importados.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.3. Situação Judicial (Art. 4º, III, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O contribuinte não deve possuir ação pendente de julgamento na esfera judicial contra o recolhimento do imposto devido por antecipação (com ou sem substituição tributária). Caso possua, deve comprovar a solicitação de desistência, se a sentença já proferida tiver sido favorável ao contribuinte.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.4. Autorização de Importação (Art. 4º, IV, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Se houver comercialização de veículo importado e a importação tiver sido efetuada por terceiro, o contribuinte deve apresentar a autorização de importação contendo nome empresarial, endereço e inscrição no CNPJ do estabelecimento importador.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.5. Informação sobre Atividades Específicas (Art. 4º, § 1º, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'No requerimento de credenciamento, deve ser informado se o estabelecimento exerce atividades adicionais, como:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'Empresa Sistemista: Nos termos do § 1º do Art. 1º da Lei nº 13.484/2008.',
        'Industrial que Produza Bens para Ativo Permanente: Bens destinados a integrar o ativo permanente de estabelecimento industrial de veículos beneficiário do PRODEAUTO.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1.6. Credenciamento de Não Inscrito no CACEPE (Art. 4º, § 2º, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'É permitida a concessão de credenciamento a contribuinte não inscrito no CACEPE, desde que inscrito no CNPJ. A fruição dos incentivos fiscais, neste caso, fica condicionada ao atendimento dos requisitos previstos no caput.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Procedimentos e Documentação Necessários para Solicitar o Incentivo'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O processo de concessão do incentivo fiscal pelo PRODEAUTO se inicia com a solicitação de credenciamento, conforme estabelecido no Art. 4º do Anexo 36 do Decreto nº 44.650/2017.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.1. Requerimento de Credenciamento (Art. 4º, Anexo 36):'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O contribuinte deve encaminhar um requerimento ao órgão da Sefaz responsável pelo controle e acompanhamento de benefícios fiscais.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '2.2. Documentação e Informações para o Requerimento:'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'O requerimento deve conter as informações e documentações que comprovem o atendimento de todos os critérios e condições listados no item 1 desta trilha.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Legislação e Normas Aplicáveis'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'A base legal para a concessão do incentivo do PRODEAUTO é composta por:'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Lei nº 13.484, de 29 de junho de 2008: Institui o Programa de Desenvolvimento do Setor Automotivo do Estado de Pernambuco, define seus beneficiários e os tipos de incentivos, e estabelece a condição de credenciamento para a fruição (Art. 1º, 2º, 3º).',
        'B - Decreto nº 44.650, de 30 de junho de 2017 – Anexo 36 (DO PROGRAMA DE DESENVOLVIMENTO DO SETOR AUTOMOTIVO DO ESTADO DE PERNAMBUCO - PRODEAUTO): Este anexo regulamenta detalhadamente o PRODEAUTO, especialmente no Capítulo II – Do Credenciamento, Descredenciamento e Recredenciamento para Fruição dos Incentivos Fiscais (Art. 4º ao 6º). Ele estabelece os critérios e os procedimentos para a obtenção do credenciamento.',
        'C - Decreto nº 53.565, de 9 de setembro de 2022: Modifica o Decreto nº 44.650, de 2017, incorporando normas relativas ao PRODEAUTO, indicando a necessidade de sempre consultar a versão mais atualizada da legislação.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '4. Outros Pontos Relevantes na Concessão'
    },
    {
      tipo: 'lista-alfabetica',
      conteudo: [
        'A - Início da Vigência do Credenciamento (Art. 4º, § 3º, Anexo 36): A condição de credenciado vigora a partir da data da publicação do respectivo edital no Diário Oficial do Estado (DOE). Na hipótese de credenciamento de contribuinte não inscrito no CACEPE (apenas CNPJ), o edital pode indicar apenas o nome empresarial e o número-base de inscrição no CNPJ.',
        'B - Convalidação de Atos Normativos (Art. 11, Decreto nº 53.565/2022): A legislação prevê a aplicação de atos normativos específicos que fazem referência a dispositivos revogados pelo Decreto nº 53.565/2022, desde que compatíveis. Isso reforça a complexidade na análise histórica da concessão.',
        'C - Não Aplicação de Disposições Gerais de Credenciamento (Art. 4º, § 4º, Anexo 36): O credenciamento do PRODEAUTO possui regras específicas e, por isso, não se aplica a ele o disposto no Art. 273 do Decreto nº 44.650/2017 (não detalhado, mas indica uma excepcionalidade nas regras de credenciamento geral).'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Exemplo Prático: Concessão de Credenciamento para uma Nova Indústria Sistemista'
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Uma nova indústria, a "Componentes Automotivos PE Ltda.", pretende instalar-se em Pernambuco para fornecer peças para uma montadora de veículos já incentivada pelo PRODEAUTO.'
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '1. Verificação de Critérios:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A "Componentes Automotivos PE Ltda." assegura sua inscrição no CNPJ e se prepara para a inscrição no CACEPE (regime normal).',
        'Verifica que sua atividade principal se enquadra como empresa sistemista, nos termos do § 1º do Art. 1º da Lei nº 13.484/2008.',
        'Confirma que não possui pendências judiciais e que seus sócios estão regulares.'
      ]
    }, 
    {
      tipo: 'subtitulo-bold',
      conteudo: '2. Preparação do Requerimento:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A empresa elabora o requerimento de credenciamento ao órgão da Sefaz responsável, declarando que exercerá a atividade de sistemista e anexando a documentação societária, o projeto de instalação e as certidões de regularidade.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: '3. Análise e Publicação:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A Sefaz analisa o requerimento e, verificando o cumprimento dos requisitos, defere o pedido de credenciamento.',
        'O edital de credenciamento da "Componentes Automotivos PE Ltda." é publicado no DOE em 15 de novembro de 2024.'
      ]
    },
    {
      tipo: 'subtitulo-bold',
      conteudo: 'Início da Fruição do Incentivo:'
    },
    {
      tipo: 'lista',
      conteudo: [
        'A partir de 15 de novembro de 2024, a "Componentes Automotivos PE Ltda." adquire a condição de credenciada no PRODEAUTO, podendo, a partir de então, usufruir dos incentivos fiscais previstos para as empresas sistemistas, como o diferimento do ICMS na aquisição interna de insumos (conforme Art. 2º, III da Lei nº 13.484/2008), sujeita à observância das condições e obrigações acessórias.'
      ]
    },
    {
      tipo: 'paragrafo',
      conteudo: 'Este processo de concessão do credenciamento é a porta de entrada para a fruição dos incentivos do PRODEAUTO e requer atenção rigorosa aos detalhes e requisitos legais para garantir a segurança jurídica do benefício.'
    }
  ]
}






  // ...aqui viria a sua próxima trilha, também com um 'blocosDeConteudo'
];


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
    ]
  },

{
    id: 'proind-lançamentos-incentivo',
    programa: 'PROIND',
    titulo: 'T2:  Lançamentos do Incentivo',
    descricaoHeader: 'Conheça os fundamentos do PROIND e como ele pode transformar sua carreira.',
    sobreTrilha: 'Aqui você vai aprender como calcular o incentivo fiscal do PROIND, entendendo o que é o crédito presumido, como aplicá-lo e registrá-lo corretamente. Ao final, estará capacitado a identificar operações elegíveis, realizar cálculos precisos e compreender as regras para manter o benefício.',
    urlVideo: '',
    blocosDeConteudo: [
      {
        tipo: 'subtitulo-bold',
        conteudo:'1. Introdução e Contextualização do Tema'
      }, 
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
    ]
  },

{
    id: 'proind-concessao-incentivo',
    programa: 'PROIND',
    titulo: 'Trilha 4: Concessão do Incentivo (PROIND)',
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
    ]
  },






  // ...aqui viria a sua próxima trilha, também com um 'blocosDeConteudo'
];


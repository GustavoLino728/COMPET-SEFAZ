from enum import Enum

# Define knowledge paths and associated keywords/tags using an Enum
class KnowledgePath(Enum):
    CALCULO_INCENTIVO = "Calculo_do_Incentivo"
    LANCAMENTOS_INCENTIVO = "Lancamentos_do_Incentivo"
    CONTROLES_SUPLEMENTARES = "Controles_Suplementares"

# Those keywords are used to match words used in prompt with knowledge paths
KNOWLEDGE_PATHS_KEYWORDS = {
    KnowledgePath.CALCULO_INCENTIVO.value: ["cálculo", "calculo", "saldo", "apuração", "apuraçao", "apuracao", "saldo devedor"],
    KnowledgePath.LANCAMENTOS_INCENTIVO.value: ["lançamento", "lancamento", "dedução", "deducao", "código próprio", "codigo proprio", "taxa de administração", "taxa de administracao", "taxa de adm", "taxa do feef", "feef"],
    KnowledgePath.CONTROLES_SUPLEMENTARES.value: ["ICMS mínimo", "ICMS", "imposto sobre operações relativas à circulação de mercadorias", "imposto sobre operacoes relativas a circulacao de mercadorias", "identificação e correção", "identificacao e correcao", "cálculo", "calculo", "diferença", "diferenca", "recolhimento"],
}

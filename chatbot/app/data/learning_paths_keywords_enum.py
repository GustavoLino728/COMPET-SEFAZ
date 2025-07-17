from enum import Enum

# Define knowledge paths and associated keywords/tags using an Enum
class LearningPath(Enum):
    CALCULO_INCENTIVO = "Cálculo do Incentivo"
    LANCAMENTOS_INCENTIVO = "Lançamentos do Incentivo"
    CONTROLES_SUPLEMENTARES = "Controles Suplementares"

# Those keywords are used to match words used in prompt with knowledge paths
LEARNING_PATHS_KEYWORDS = {
    LearningPath.CALCULO_INCENTIVO.value: ["calculo", "saldo", "apuracao", "saldo devedor"],
    LearningPath.LANCAMENTOS_INCENTIVO.value: ["lancamento", "deducao", "codigo proprio", "taxa de administracao", "taxa de adm", "taxa do feef", "feef"],
    LearningPath.CONTROLES_SUPLEMENTARES.value: ["icms", "imposto sobre operacoes relativas a circulacao de mercadorias", "identificacao e correcao", "calculo", "diferenca", "recolhimento"],
}
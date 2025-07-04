# Chatbot

Este projeto implementa um chatbot inteligente utilizando a API da OpenAI (modelo `gpt-4o-mini`) e é empacotado com Docker para facilitar a configuração e execução em qualquer ambiente.

## Visão Geral do Chatbot

O **Sefaz Chatbot Inteligente** é uma aplicação de chatbot baseada em console que interage com os usuários, processando suas entradas através do modelo de linguagem `gpt-4o-mini` da OpenAI. Ele é projetado para ser fácil de configurar e rodar, ideal para equipes que precisam de um ambiente de desenvolvimento consistente.

## Pré-requisitos

Para rodar este projeto, você precisará ter o seguinte software instalado em sua máquina:

* **Git**: Para clonar o repositório do projeto.

  * [Download Git](https://git-scm.com/downloads)

* **Docker Desktop** (para Windows/macOS) ou **Docker Engine e Docker Compose** (para Linux): O Docker é essencial para empacotar e executar a aplicação sem se preocupar com dependências de ambiente. Certifique-se de que o comando `docker compose` (sem o hífen) esteja disponível no seu terminal.

  * [Download Docker Desktop](https://www.docker.com/products/docker-desktop/)

  * [Instalação do Docker Engine e Compose (Linux)](https://docs.docker.com/engine/install/)

## Configuração do Projeto

Siga estes passos para configurar o projeto em sua máquina local:

### bash

1. **Clone o Repositório:**

```bash
git clone https://github.com/GustavoLino728/COMPET-SEFAZ.git
cd COMPET-SEFAZ/chatbot # Certifique-se de navegar para a pasta 'chatbot' do projeto
```

2. **Configurar Variáveis de Ambiente (`.env`):**
Este projeto utiliza uma chave de API da OpenAI, que deve ser mantida em sigilo. Crie um arquivo chamado `.env` na **raiz da pasta `chatbot`** (no mesmo nível do `Dockerfile` e `docker-compose.yml`).

Adicione a seguinte linha ao arquivo `.env`, substituindo `"SUA_CHAVE_DA_API_OPENAI"` pela sua chave real da OpenAI:

```
OPENAI_API_KEY="SUA_CHAVE_DA_API_OPENAI"
```

**Importante**: O arquivo `.env` está configurado para ser ignorado pelo Git (via `.gitignore`) e **não deve ser commitado** no repositório.

3. **Verificar Quota da OpenAI:**
Certifique-se de que sua conta da OpenAI possui créditos ou um método de pagamento configurado, pois o uso da API é cobrado por tokens. Você pode verificar e gerenciar isso em:

* [Painel de Desenvolvedor OpenAI](https://platform.openai.com/)

* [Faturamento e Limites de Uso](https://platform.openai.com/account/billing/overview)

## Executando a Aplicação

Com o Docker instalado e as variáveis de ambiente configuradas, você pode rodar o chatbot com os seguintes comandos:

### bash

1. **Limpar e Construir/Iniciar o Container:**
Este comando irá parar e remover quaisquer containers e imagens antigas do projeto, e então construir uma nova imagem Docker com o código mais recente e iniciar o serviço do chatbot em segundo plano.

```bash
docker compose down --rmi all --volumes --remove-orphans
docker compose up --build -d
```

2. **Interagir com o Chatbot:**
Para usar o chatbot no modo interativo (onde você pode digitar e ver as respostas no terminal), execute:

```bash
docker compose run --rm chatbot
```

Você verá a mensagem de boas-vindas do chatbot e poderá digitar suas perguntas. Para sair da interação, pressione ctrl + c ou digite `sair` ou `tchau`. O container será automaticamente removido ao sair.


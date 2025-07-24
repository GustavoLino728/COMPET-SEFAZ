# Instruções para Rodar o Projeto COMPET-SEFAZ

## Requisitos
- Docker e Docker Compose instalados na máquina
- Git instalado para clonar o repositório

---

## Passos para rodar o projeto

1. Clone o repositório:
    ```bash
    git clone https://github.com/GustavoLino728/COMPET-SEFAZ/
    cd COMPET-SEFAZ
    ```

2. Crie o arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias (exemplo):
    ```
    POSTGRES_DB=nome_do_banco
    POSTGRES_USER=usuario
    POSTGRES_PASSWORD=senha
    ```

3. Suba os containers com Docker Compose e faça o build da imagem:
    ```bash
    docker compose up -d --build
    ```

4. Execute as migrations para criar as tabelas no banco de dados:
    ```bash
    docker compose exec backend python manage.py migrate
    ```

5. Crie um superusuário para acessar o admin do Django:
    ```bash
    docker compose exec backend python manage.py createsuperuser
    ```

---
Pronto! Agora o backend estará rodando em `http://localhost:8000` e você poderá acessar o painel admin com o superusuário criado.

# Usa uma imagem base Python. Escolha a versão que você precisa.
FROM python:3.13-slim-bookworm

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo requirements.txt para o diretório de trabalho
COPY requirements.txt .

# Instala as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o restante do código da sua aplicação para o container
COPY app/ .

# Comando para iniciar o chatbot quando o container for executado
CMD ["python", "main.py"]

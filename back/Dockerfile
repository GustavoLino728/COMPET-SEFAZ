FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
        tesseract-ocr \
        tesseract-ocr-por \
        poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt --timeout 120 --retries 5

# Pre-download the sentence transformer model during build
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('neuralmind/bert-base-portuguese-cased')"

# Copy project
COPY . .

# Create a script to wait for postgres
RUN echo '#!/bin/bash\n\
until pg_isready -h postgres -p 5432 -U $POSTGRES_USER; do\n\
  echo "Waiting for postgres..."\n\
  sleep 2\n\
done\n\
echo "PostgreSQL started"\n\
exec "$@"' > /wait-for-postgres.sh && chmod +x /wait-for-postgres.sh

# Expose port
EXPOSE 8000

# Run the application
CMD ["/wait-for-postgres.sh", "python", "manage.py", "runserver", "0.0.0.0:8000"]

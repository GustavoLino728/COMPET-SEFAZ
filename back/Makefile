# PostgreSQL Management Makefile
# Usage: make postgres-start, make postgres-stop, make postgres-status

# Variables
POSTGRES_SERVICE = postgresql
DB_NAME = compet_sefaz
DB_USER = compet_user
DB_PASSWORD = compet123

# Main commands
.PHONY: help postgres-start postgres-stop postgres-status postgres-restart postgres-setup postgres-test

# Help
help:
	@echo "Available commands:"
	@echo "  make postgres-start   - Start PostgreSQL"
	@echo "  make postgres-stop    - Stop PostgreSQL"
	@echo "  make postgres-status  - Check PostgreSQL status"
	@echo "  make postgres-restart - Restart PostgreSQL"
	@echo "  make postgres-setup   - Configure database and user"
	@echo "  make postgres-test    - Test connection"
	@echo "  make dev-setup        - Full development setup (DB + migrations + admin)"
	@echo "  make admin-create     - Create admin user"
	@echo "  make admin-reset      - Reset admin user"
	@echo "  make admin-info       - Show admin credentials"
	@echo "  make help            - Show this help"

# Start PostgreSQL
postgres-start:
	@echo "🚀 Starting PostgreSQL..."
	sudo systemctl start $(POSTGRES_SERVICE)
	@echo "✅ PostgreSQL started!"

# Stop PostgreSQL
postgres-stop:
	@echo "�� Stopping PostgreSQL..."
	sudo systemctl stop $(POSTGRES_SERVICE)
	@echo "✅ PostgreSQL stopped!"

# Check status
postgres-status:
	@echo "📊 PostgreSQL status:"
	sudo systemctl status $(POSTGRES_SERVICE)

# Restart PostgreSQL
postgres-restart:
	@echo "🔄 Restarting PostgreSQL..."
	sudo systemctl restart $(POSTGRES_SERVICE)
	@echo "✅ PostgreSQL restarted!"

# Configure database and user
postgres-setup:
	@echo "Configuring database and user..."
	@echo "Creating database: $(DB_NAME)"
	@echo "Creating user: $(DB_USER)"
	sudo -u postgres psql -c "CREATE DATABASE $(DB_NAME);" || echo "Database already exists"
	sudo -u postgres psql -c "CREATE USER $(DB_USER) WITH PASSWORD '$(DB_PASSWORD)';" || echo "User already exists"
	sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $(DB_NAME) TO $(DB_USER);"
	@echo "✅ Configuration completed!"

# Test connection
postgres-test:
	@echo "🧪 Testing connection with PostgreSQL..."
	@PGPASSWORD=$(DB_PASSWORD) psql -h localhost -U $(DB_USER) -d $(DB_NAME) -c "SELECT version();" || echo "❌ Connection failed"

# Development command (starts postgres and runs migrations)
dev-setup: postgres-start postgres-setup
	@echo "🐍 Configuring Python environment..."
	pip install -r requirements.txt
	@echo "🗄️ Applying migrations..."
	python manage.py makemigrations
	python manage.py migrate
	@echo "👤 Creating admin user..."
	python manage.py seed_admin
	@echo "✅ Development environment configured!"

# Command to stop everything
dev-stop: postgres-stop
	@echo "✅ Development environment stopped!"

# Admin user management
admin-create:
	@echo "👤 Creating admin user..."
	python manage.py create_admin_user

admin-reset:
	@echo "🔄 Resetting admin user..."
	python manage.py create_admin_user --email admin@gmail.com --password admin12345

admin-info:
	@echo "📋 Admin credentials:"
	@echo "   Email: admin@gmail.com"
	@echo "   Password: admin12345"
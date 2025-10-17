# 🌱 Sistema de Seed de Usuário Administrador

Este sistema garante que sempre exista um usuário administrador na aplicação, mesmo após deploys ou resets do banco de dados.

## 🚀 Como Funciona

O comando `seed_admin` é executado automaticamente:
- ✅ **No Docker Compose** - sempre que o container Django iniciar
- ✅ **No Dockerfile** - durante o build da imagem
- ✅ **Manual** - quando necessário

## 📋 Comandos Disponíveis

### Comando Básico
```bash
python manage.py seed_admin
```

### Comando com Parâmetros Personalizados
```bash
python manage.py seed_admin --email admin@empresa.com --password minhasenha123
```

### Forçar Atualização de Senha
```bash
python manage.py seed_admin --force
```

## 🔧 Parâmetros

| Parâmetro | Padrão | Descrição |
|-----------|--------|-----------|
| `--email` | `admin@sefaz.com` | Email do usuário administrador |
| `--password` | `admin12345` | Senha do usuário administrador |
| `--force` | `False` | Força atualização da senha se usuário existir |

## 🎯 Comportamento

### ✅ **Usuário NÃO existe:**
- Cria novo usuário com as credenciais fornecidas
- Define permissões de administrador (`is_staff=True`, `is_superuser=True`)

### ⚠️ **Usuário JÁ existe:**
- Mantém o usuário existente
- Atualiza permissões de administrador
- **NÃO altera a senha** (use `--force` se necessário)

## 🐳 Execução Automática

### Docker Compose
```yaml
command: >
  sh -c "python manage.py migrate &&
           python manage.py seed_admin &&
           python manage.py runserver 0.0.0.0:8000"
```

### Dockerfile
```dockerfile
CMD ["/wait-for-postgres.sh", "sh", "-c", "python manage.py migrate && python manage.py seed_admin && python manage.py runserver 0.0.0.0:8000"]
```

## 🔒 Segurança

### Desenvolvimento
- ✅ Senha padrão: `admin12345`
- ✅ Email padrão: `admin@sefaz.com`

### Produção
- ⚠️ **IMPORTANTE**: Altere a senha após o primeiro login
- ⚠️ Use `--password` para definir senha segura
- ⚠️ Considere usar variáveis de ambiente

## 📝 Exemplo de Uso em Produção

```bash
# Definir senha segura
python manage.py seed_admin --password "MinhaSenh@Segur@123"

# Ou usar variáveis de ambiente
export ADMIN_EMAIL="admin@empresa.com"
export ADMIN_PASSWORD="SenhaSegura123"
python manage.py seed_admin --email $ADMIN_EMAIL --password $ADMIN_PASSWORD
```

## 🎯 Credenciais Padrão

Após o seed, você pode fazer login com:
- **Email:** `admin@sefaz.com`
- **Senha:** `admin12345`

## ✨ Vantagens

1. **🔄 Automático**: Executa sempre que a aplicação iniciar
2. **🛡️ Seguro**: Não sobrescreve usuários existentes
3. **🔧 Flexível**: Permite customização de credenciais
4. **📊 Informativo**: Mostra status detalhado da operação
5. **🚀 Deploy-Ready**: Funciona em qualquer ambiente

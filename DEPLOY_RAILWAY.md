# 🚀 Deploy no Railway - Guia Completo

Este guia te levará passo a passo para fazer o deploy da aplicação COMPET-SEFAZ no Railway de forma **100% gratuita**.

## 📋 Pré-requisitos

- ✅ Conta no GitHub
- ✅ Conta no Railway (railway.app)
- ✅ Código no GitHub (fork ou repositório próprio)

## 🎯 Passo a Passo

### 1️⃣ **Preparar o Repositório**

#### Opção A: Fork (Recomendado)
1. Vá para o repositório original no GitHub
2. Clique em **"Fork"** no canto superior direito
3. Escolha sua conta como destino
4. Clique em **"Create fork"**

#### Opção B: Upload Manual
1. Crie um novo repositório no seu GitHub
2. Faça upload dos arquivos do projeto
3. Faça commit e push

### 2️⃣ **Criar Conta no Railway**

1. Acesse [railway.app](https://railway.app)
2. Clique em **"Login"**
3. Escolha **"Login with GitHub"**
4. Autorize o Railway a acessar seus repositórios

### 3️⃣ **Criar Novo Projeto**

1. No dashboard do Railway, clique em **"New Project"**
2. Escolha **"Deploy from GitHub repo"**
3. Selecione seu repositório (fork ou repositório próprio)
4. Clique em **"Deploy Now"**

### 4️⃣ **Configurar Banco de Dados**

1. No projeto Railway, clique em **"+ New"**
2. Escolha **"Database"** → **"PostgreSQL"**
3. Aguarde a criação do banco
4. Anote as credenciais do banco (aparecerão automaticamente)

### 5️⃣ **Configurar Variáveis de Ambiente**

1. No seu serviço Django, vá em **"Variables"**
2. Adicione as seguintes variáveis:

```bash
# Banco de Dados (copie do serviço PostgreSQL)
POSTGRES_DB=railway
POSTGRES_USER=postgres
POSTGRES_PASSWORD=[sua_senha_do_railway]
POSTGRES_HOST=[seu_host_do_railway]
POSTGRES_PORT=5432

# Django
DJANGO_SETTINGS_MODULE=config.settings
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=[gere_uma_chave_secreta_aleatória]

# Porta (Railway define automaticamente)
PORT=8000
```

### 6️⃣ **Configurar o Deploy**

1. No serviço Django, vá em **"Settings"**
2. Em **"Build Command"**, deixe vazio
3. Em **"Start Command"**, use:
```bash
python manage.py migrate && python manage.py seed_admin && python manage.py runserver 0.0.0.0:$PORT
```

### 7️⃣ **Aguardar o Deploy**

1. O Railway irá automaticamente:
   - Fazer build da aplicação
   - Instalar dependências
   - Executar migrações
   - Criar usuário administrador
   - Iniciar o servidor

2. Aguarde o status ficar **"Deployed"** (verde)

### 8️⃣ **Acessar a Aplicação**

1. Clique no domínio gerado pelo Railway
2. Ou use o botão **"Open"** no dashboard
3. Sua aplicação estará online! 🎉

## 🔑 Credenciais de Acesso

Após o deploy, você pode fazer login com:
- **Email:** `admin@sefaz.com`
- **Senha:** `admin12345`

## 🎯 Configurações Adicionais (Opcional)

### Frontend (React)
Para fazer deploy do frontend também:

1. Crie um novo serviço no Railway
2. Escolha **"Deploy from GitHub repo"**
3. Configure:
   - **Build Command:** `cd front && npm install && npm run build`
   - **Start Command:** `cd front && npx serve -s build -l $PORT`

### Domínio Personalizado
1. No Railway, vá em **"Settings"**
2. Em **"Domains"**, adicione seu domínio
3. Configure o DNS conforme instruções

## 💰 Custos

- ✅ **100% GRATUITO** para projetos pequenos/médios
- ✅ **$5/mês** apenas se exceder limites gratuitos
- ✅ **Sem cartão de crédito** necessário

## 🛠️ Troubleshooting

### Erro de Build
- Verifique se todas as dependências estão no `requirements.txt`
- Confirme se as variáveis de ambiente estão corretas

### Erro de Banco
- Verifique se o serviço PostgreSQL está rodando
- Confirme se as credenciais estão corretas

### Erro de Porta
- Certifique-se de usar `$PORT` na configuração
- Railway define a porta automaticamente

## 📞 Suporte

- 📚 [Documentação Railway](https://docs.railway.app)
- 💬 [Discord Railway](https://discord.gg/railway)
- 🐛 [GitHub Issues](https://github.com/railwayapp/cli/issues)

## ✨ Próximos Passos

1. **Teste a aplicação** - Faça login e navegue
2. **Configure domínio** - Se desejar domínio personalizado
3. **Monitore logs** - Use o dashboard do Railway
4. **Backup automático** - Railway faz backup automático do banco

---

**🎉 Parabéns! Sua aplicação está online e gratuita!**

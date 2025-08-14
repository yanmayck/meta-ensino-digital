# 🚀 Meta Educação - Guia de Início Rápido

## 📖 O que é a Meta Educação?

A **Meta Educação** é uma plataforma educacional completa para cursos online, desenvolvida com foco na conclusão do ensino médio para adultos. A plataforma oferece:

- ✅ **Sistema de Cursos** completo com módulos e lições
- ✅ **Painel Administrativo** isolado e seguro
- ✅ **Upload de Vídeos** e materiais didáticos
- ✅ **Acompanhamento de Progresso** em tempo real
- ✅ **Sistema de Suporte** integrado
- ✅ **Arquitetura de Segurança** enterprise-grade

## 🏃‍♂️ Início Rápido (5 minutos)

### Opção 1: Execução Direta (Desenvolvimento)
```bash
# 1. Clone o projeto
git clone <seu-repositorio>
cd meta-educacao

# 2. Instale dependências
npm install

# 3. Configure o banco
createdb meta_educacao
cp .env.example .env
# Configure DATABASE_URL no .env

# 4. Execute migrações
npm run db:push

# 5. Inicie o servidor
npm run dev

# 6. Acesse a aplicação
# Principal: http://localhost:5000
# Admin: http://localhost:5001 (com ENABLE_ADMIN_SERVER=true)
```

### Opção 2: Docker (Recomendado)
```bash
# 1. Clone o projeto
git clone <seu-repositorio>
cd meta-educacao

# 2. Configure ambiente
cp .env.example .env

# 3. Inicie com Docker
chmod +x scripts/docker-dev.sh
./scripts/docker-dev.sh setup

# 4. Acesse os serviços
# Principal: http://localhost:5000
# Admin: http://localhost:5001
# Adminer (DB): http://localhost:8080
```

## 🔧 Comandos Úteis

### Desenvolvimento Local
```bash
# Servidor público apenas
npm run dev

# Com servidor admin isolado
ENABLE_ADMIN_SERVER=true npm run dev

# Abrir estúdio do banco
npm run db:push
npm run db:studio
```

### Docker - Desenvolvimento
```bash
# Configuração inicial completa
./scripts/docker-dev.sh setup

# Controle de serviços
./scripts/docker-dev.sh start    # Iniciar
./scripts/docker-dev.sh stop     # Parar
./scripts/docker-dev.sh logs     # Ver logs
./scripts/docker-dev.sh status   # Status

# Utilitários
./scripts/docker-dev.sh shell    # Shell no container
./scripts/docker-dev.sh db       # Conectar ao PostgreSQL
./scripts/docker-dev.sh backup   # Backup do banco
```

### Docker - Produção
```bash
# Deploy completo
sudo ./scripts/docker-prod.sh deploy

# Controle de serviços
sudo ./scripts/docker-prod.sh start
sudo ./scripts/docker-prod.sh stop
sudo ./scripts/docker-prod.sh status

# Monitoramento
sudo ./scripts/docker-prod.sh health
sudo ./scripts/docker-prod.sh logs

# Backup e restore
sudo ./scripts/docker-prod.sh backup
sudo ./scripts/docker-prod.sh restore backup_file.sql.gz
```

## 🔐 Segurança e Arquitetura

### Dual-Server Architecture
A plataforma utiliza **dois servidores separados** para máxima segurança:

#### 🌐 Servidor Público (Porta 5000)
- **Acesso**: Internet pública
- **Função**: Aplicação para usuários finais
- **Rotas**: Login, cursos, dashboard do estudante
- **Segurança**: Rate limiting padrão

#### 🔒 Servidor Admin (Porta 5001)
- **Acesso**: **APENAS localhost** (127.0.0.1)
- **Função**: Administração exclusiva
- **Rotas**: Gestão de usuários, cursos, analytics
- **Segurança**: Rate limiting rigoroso, isolamento total

### Acessando o Admin em Produção
```bash
# Via SSH tunnel (recomendado)
ssh -L 5001:localhost:5001 usuario@seu-servidor

# Via VPN (alternativa)
# Configure VPN para acessar localhost do servidor
```

## 📊 Funcionalidades por Usuário

### 👥 Estudantes
- Registro e login seguro
- Dashboard personalizado
- Catálogo de cursos
- Progresso de aprendizado
- Upload de avatar
- Sistema de suporte
- Certificados

### 👨‍🏫 Instrutores
- Criação de cursos
- Gestão de módulos
- Upload de materiais
- Acompanhamento de turmas
- Analytics detalhado

### 🔧 Administradores
- Painel isolado e seguro
- Gestão completa de usuários
- Moderação de cursos
- Analytics da plataforma
- Sistema de suporte
- Logs de auditoria

## 🌍 Variáveis de Ambiente Essenciais

```bash
# Database (Obrigatório)
DATABASE_URL="postgresql://user:pass@localhost:5432/meta_educacao"

# Security (Obrigatório em produção)
JWT_SECRET="sua-chave-super-segura-32-caracteres-ou-mais"

# Servers
NODE_ENV="development"  # ou "production"
ENABLE_ADMIN_SERVER="true"

# CORS (Produção)
PUBLIC_ALLOWED_ORIGINS="https://seu-dominio.com"
ADMIN_ALLOWED_ORIGINS="http://localhost:5001"
```

## 🔍 Resolução de Problemas

### Problema: Admin não está acessível
```bash
# Verificar se está habilitado
ENABLE_ADMIN_SERVER=true npm run dev

# Ou no Docker
docker-compose exec app curl http://localhost:5001/health
```

### Problema: Banco não conecta
```bash
# Verificar se PostgreSQL está rodando
sudo systemctl status postgresql

# Testar conexão direta
psql $DATABASE_URL
```

### Problema: Rate limiting muito restrito
```bash
# Ajustar em docker-compose.yml ou variáveis de ambiente
RATE_LIMIT_MAX_REQUESTS="200"  # Aumentar limite
```

## 📁 Estrutura do Projeto

```
meta-educacao/
├── 📁 client/                 # Frontend React + TypeScript
├── 📁 server/                 # Backend Express + PostgreSQL
│   ├── admin-server.ts        # 🔒 Servidor admin isolado
│   ├── public-server.ts       # 🌐 Servidor público
│   └── routes/                # Rotas organizadas
├── 📁 shared/                 # Schemas compartilhados
├── 📁 scripts/                # Scripts Docker
├── 📁 nginx/                  # Configuração Nginx
├── docker-compose.yml         # 🐳 Desenvolvimento
├── docker-compose.prod.yml    # 🚀 Produção
└── README.md                  # 📖 Documentação completa
```

## 🆘 Precisa de Ajuda?

1. **Documentação Completa**: Leia o `README.md`
2. **Issues**: Use o sistema de issues do GitHub
3. **Segurança**: Reporte vulnerabilidades via email
4. **Logs**: Verifique os logs para detalhes de erros

---

**Meta Educação** - Transformando educação com tecnologia segura e moderna! 🎓
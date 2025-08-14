# Meta Educação - Plataforma Educacional Completa

![Meta Educação](https://img.shields.io/badge/Meta%20Educação-v2.0-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=flat-square)

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Arquitetura de Segurança](#arquitetura-de-segurança)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Configuração](#instalação-e-configuração)
- [Docker para Desenvolvimento](#docker-para-desenvolvimento)
- [Docker para Produção](#docker-para-produção)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [API Documentation](#api-documentation)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Segurança](#segurança)
- [Contribuição](#contribuição)

## 🎯 Sobre o Projeto

Meta Educação é uma plataforma educacional completa desenvolvida para oferecer cursos online com foco na conclusão do ensino médio para adultos. A plataforma oferece uma experiência de aprendizado moderna e segura, com ferramentas abrangentes para estudantes, professores e administradores.

### 🌟 Diferenciais

- **Arquitetura Dual-Server**: Separação completa entre aplicação pública e painel administrativo
- **Segurança Enterprise**: Rate limiting, autenticação JWT, isolamento de serviços
- **Interface Moderna**: Design responsivo com componentes reutilizáveis
- **Escalabilidade**: Preparado para crescimento com PostgreSQL e containerização
- **Analytics em Tempo Real**: Acompanhamento detalhado do progresso dos alunos

## 🚀 Funcionalidades

### 👥 Para Estudantes
- ✅ **Registro e Login Seguro**: Autenticação com JWT e validação robusta
- ✅ **Dashboard Personalizado**: Visão geral do progresso e atividades
- ✅ **Catálogo de Cursos**: Navegação intuitiva por cursos disponíveis
- ✅ **Progresso de Aprendizado**: Acompanhamento detalhado por módulo e lição
- ✅ **Upload de Avatar**: Personalização do perfil do usuário
- ✅ **Sistema de Suporte**: Tickets para dúvidas e problemas
- ✅ **Avaliações**: Sistema completo de provas e exercícios
- ✅ **Certificados**: Geração automática após conclusão dos cursos

### 👨‍🏫 Para Instrutores
- ✅ **Criação de Cursos**: Editor completo para estruturação de conteúdo
- ✅ **Gestão de Módulos**: Organização hierárquica do conteúdo
- ✅ **Upload de Materiais**: Vídeos, PDFs, apresentações e outros recursos
- ✅ **Acompanhamento de Turmas**: Visualização do progresso dos alunos
- ✅ **Analytics Detalhado**: Métricas de engajamento e performance

### 🔧 Para Administradores
- ✅ **Painel Administrativo Isolado**: Interface segura em servidor separado
- ✅ **Gestão de Usuários**: CRUD completo com controle de roles
- ✅ **Gestão de Cursos**: Aprovação, edição e moderação de conteúdo
- ✅ **Analytics Completo**: Dashboards com métricas da plataforma
- ✅ **Sistema de Suporte**: Gerenciamento centralizado de tickets
- ✅ **Logs de Auditoria**: Rastreamento de todas as ações administrativas
- ✅ **Configurações do Sistema**: Controle fino de funcionalidades

## 🛡️ Arquitetura de Segurança

### Dual-Server Architecture

A plataforma utiliza uma arquitetura inovadora de dois servidores isolados:

#### 🌐 Servidor Público (Porta 5000)
- **Propósito**: Aplicação principal para usuários finais
- **Exposição**: Acessível via internet
- **Funcionalidades**: Login, cursos, dashboard do aluno
- **Segurança**: Rate limiting padrão (100 req/15min)

#### 🔐 Servidor Administrativo (Porta 5001)
- **Propósito**: Exclusivamente para administração
- **Exposição**: **APENAS localhost** (127.0.0.1)
- **Funcionalidades**: Gestão de usuários, cursos e analytics
- **Segurança**: Rate limiting rigoroso (20 req/5min)

### Benefícios de Segurança
- **Isolamento Físico**: Admin não exposto na internet
- **Superfície de Ataque Reduzida**: Acesso admin apenas via SSH/VPN
- **Controles Independentes**: Políticas de segurança específicas
- **Auditoria Separada**: Logs isolados por contexto

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes acessíveis
- **React Query** - Gerenciamento de estado do servidor
- **React Hook Form** - Formulários com validação
- **Wouter** - Roteamento client-side

### Backend
- **Node.js 18+** - Runtime
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **JWT** - Autenticação
- **BCrypt** - Hash de senhas
- **Helmet** - Headers de segurança
- **Rate Limiting** - Proteção contra ataques

### Database
- **PostgreSQL 15+** - Banco principal
- **Drizzle ORM** - ORM type-safe
- **Connection Pooling** - Otimização de conexões

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de desenvolvimento
- **ESBuild** - Bundling otimizado

## ⚡ Instalação e Configuração

### Pré-requisitos
- Node.js 18 ou superior
- PostgreSQL 15 ou superior
- npm ou yarn

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/meta-educacao.git
cd meta-educacao
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Configure o Banco de Dados
```bash
# Crie um banco PostgreSQL
createdb meta_educacao

# Configure as variáveis de ambiente (veja seção abaixo)
cp .env.example .env
```

### 4. Execute as Migrações
```bash
npm run db:push
```

### 5. Inicie o Servidor de Desenvolvimento
```bash
# Apenas servidor público
npm run dev

# Com servidor admin isolado
ENABLE_ADMIN_SERVER=true npm run dev
```

### 6. Acesse a Aplicação
- **Aplicação Principal**: http://localhost:5000
- **Painel Admin**: http://localhost:5001 (apenas com ENABLE_ADMIN_SERVER=true)

## 🐳 Docker para Desenvolvimento

Para facilitar o desenvolvimento em sua máquina, use o Docker Compose:

### 1. Inicie os Serviços
```bash
docker-compose up -d
```

### 2. Acesse os Serviços
- **Aplicação**: http://localhost:5000
- **Banco PostgreSQL**: localhost:5432
- **Admin Panel**: http://localhost:5001

### 3. Logs em Tempo Real
```bash
docker-compose logs -f app
```

### 4. Pare os Serviços
```bash
docker-compose down
```

## 🚀 Docker para Produção

Para deploy em produção:

### 1. Build da Imagem
```bash
docker build -f Dockerfile.prod -t meta-educacao:latest .
```

### 2. Execute em Produção
```bash
docker run -d \
  --name meta-educacao-prod \
  -p 5000:5000 \
  -p 5001:5001 \
  -e DATABASE_URL="sua-url-postgresql" \
  -e JWT_SECRET="sua-chave-super-segura" \
  -e NODE_ENV="production" \
  meta-educacao:latest
```

### 3. Com Docker Compose Produção
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/meta_educacao"
PGHOST="localhost"
PGPORT="5432"
PGUSER="seu_usuario"
PGPASSWORD="sua_senha"
PGDATABASE="meta_educacao"

# Authentication
JWT_SECRET="sua-chave-jwt-super-segura-com-32-caracteres-ou-mais"

# Server Configuration
NODE_ENV="development"
PORT="5000"
ADMIN_PORT="5001"
ENABLE_ADMIN_SERVER="true"

# CORS Configuration
PUBLIC_ALLOWED_ORIGINS="http://localhost:5000,https://seu-dominio.com"
ADMIN_ALLOWED_ORIGINS="http://localhost:5001"

# File Upload
MAX_FILE_SIZE="52428800"  # 50MB
UPLOAD_PATH="./uploads"
```

## 📚 API Documentation

### Autenticação
```bash
# Registro
POST /api/auth/register
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123",
  "role": "user"
}

# Login
POST /api/auth/login
{
  "email": "joao@email.com",
  "password": "senha123"
}
```

### Cursos Públicos
```bash
# Listar cursos
GET /api/courses

# Detalhes do curso
GET /api/courses/:courseId
```

### Rotas Administrativas (Localhost apenas)
```bash
# Estatísticas gerais
GET /api/admin/stats

# Listar usuários
GET /api/admin/users

# Criar curso
POST /api/admin/courses
```

## 📁 Estrutura do Projeto

```
meta-educacao/
├── 📁 client/                 # Frontend React
│   ├── 📁 src/
│   │   ├── 📁 components/     # Componentes reutilizáveis
│   │   ├── 📁 pages/          # Páginas da aplicação
│   │   ├── 📁 hooks/          # Hooks customizados
│   │   └── 📁 utils/          # Utilitários
├── 📁 server/                 # Backend Express
│   ├── 📁 routes/             # Rotas da API
│   ├── 📁 middleware/         # Middlewares de autenticação
│   ├── admin-server.ts        # Servidor admin isolado
│   ├── public-server.ts       # Servidor público
│   └── index.ts               # Ponto de entrada
├── 📁 shared/                 # Tipos e schemas compartilhados
├── 📁 uploads/                # Arquivos enviados
├── 📁 admin-client/           # Interface admin simples
├── docker-compose.yml         # Desenvolvimento
├── docker-compose.prod.yml    # Produção
├── Dockerfile.dev             # Container desenvolvimento
├── Dockerfile.prod            # Container produção
└── README.md                  # Esta documentação
```

## 🔒 Segurança

### Medidas Implementadas
- **Autenticação JWT** com expiração de 7 dias
- **Hash de senhas** com BCrypt (12 rounds)
- **Rate limiting** diferenciado por contexto
- **Headers de segurança** com Helmet.js
- **Validação de entrada** com Zod
- **Isolamento de servidores** para admin
- **CORS restritivo** por ambiente
- **Logs de auditoria** para ações sensíveis

### Recomendações de Produção
1. **Use HTTPS** sempre em produção
2. **Configure JWT_SECRET** com chave forte (32+ caracteres)
3. **Acesso admin** apenas via SSH/VPN
4. **Backups automáticos** do banco de dados
5. **Monitoramento** de logs e métricas
6. **Firewall** bloqueando porta 5001 externamente

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem forte
- Siga as convenções do ESLint
- Escreva testes para novas funcionalidades
- Documente APIs com exemplos

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

Para suporte técnico:
- **Issues**: Use o sistema de issues do GitHub
- **Documentação**: Consulte este README
- **Segurança**: Reporte vulnerabilidades via email

---

**Meta Educação** - Transformando a educação através da tecnologia 🚀

*Desenvolvido com ❤️ usando tecnologias modernas e seguras*
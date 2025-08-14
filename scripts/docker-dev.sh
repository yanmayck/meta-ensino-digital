#!/bin/bash

# Meta Educação - Script para Desenvolvimento com Docker
# Facilita o uso do Docker Compose para desenvolvimento

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${BLUE}"
echo "╔══════════════════════════════════════╗"
echo "║        Meta Educação - Docker        ║"
echo "║          Desenvolvimento             ║"
echo "╚══════════════════════════════════════╝"
echo -e "${NC}"

# Função para mostrar uso
show_usage() {
    echo -e "${YELLOW}Uso: $0 [comando]${NC}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  start     - Iniciar todos os serviços"
    echo "  stop      - Parar todos os serviços"
    echo "  restart   - Reiniciar todos os serviços"
    echo "  logs      - Mostrar logs em tempo real"
    echo "  status    - Mostrar status dos serviços"
    echo "  clean     - Limpar volumes e containers"
    echo "  shell     - Abrir shell no container da aplicação"
    echo "  db        - Abrir psql no banco de dados"
    echo "  backup    - Fazer backup do banco"
    echo "  setup     - Configuração inicial"
    echo ""
}

# Verificar se Docker está instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}[ERROR] Docker não está instalado!${NC}"
        echo "Instale o Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}[ERROR] Docker Compose não está instalado!${NC}"
        echo "Instale o Docker Compose: https://docs.docker.com/compose/install/"
        exit 1
    fi
}

# Verificar se .env existe
check_env() {
    if [ ! -f .env ]; then
        echo -e "${YELLOW}[WARNING] Arquivo .env não encontrado!${NC}"
        echo -e "${BLUE}[INFO] Criando .env a partir do .env.example...${NC}"
        cp .env.example .env
        echo -e "${GREEN}[SUCCESS] Arquivo .env criado!${NC}"
        echo -e "${YELLOW}[IMPORTANT] Configure as variáveis em .env antes de continuar.${NC}"
    fi
}

# Comando: start
cmd_start() {
    echo -e "${GREEN}[START] Iniciando serviços...${NC}"
    check_env
    docker-compose up -d
    echo -e "${GREEN}[SUCCESS] Serviços iniciados!${NC}"
    echo ""
    echo -e "${BLUE}Serviços disponíveis:${NC}"
    echo "  • Aplicação: http://localhost:5000"
    echo "  • Admin Panel: http://localhost:5001"
    echo "  • Adminer (DB): http://localhost:8080"
    echo "  • PostgreSQL: localhost:5432"
}

# Comando: stop
cmd_stop() {
    echo -e "${YELLOW}[STOP] Parando serviços...${NC}"
    docker-compose down
    echo -e "${GREEN}[SUCCESS] Serviços parados!${NC}"
}

# Comando: restart
cmd_restart() {
    echo -e "${YELLOW}[RESTART] Reiniciando serviços...${NC}"
    docker-compose restart
    echo -e "${GREEN}[SUCCESS] Serviços reiniciados!${NC}"
}

# Comando: logs
cmd_logs() {
    echo -e "${BLUE}[LOGS] Mostrando logs em tempo real...${NC}"
    docker-compose logs -f
}

# Comando: status
cmd_status() {
    echo -e "${BLUE}[STATUS] Status dos serviços:${NC}"
    docker-compose ps
}

# Comando: clean
cmd_clean() {
    echo -e "${RED}[WARNING] Isso irá remover todos os volumes e dados!${NC}"
    read -p "Tem certeza? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}[CLEAN] Limpando volumes e containers...${NC}"
        docker-compose down -v --remove-orphans
        docker system prune -f
        echo -e "${GREEN}[SUCCESS] Limpeza concluída!${NC}"
    else
        echo -e "${BLUE}[INFO] Operação cancelada.${NC}"
    fi
}

# Comando: shell
cmd_shell() {
    echo -e "${BLUE}[SHELL] Abrindo shell no container da aplicação...${NC}"
    docker-compose exec app /bin/bash
}

# Comando: db
cmd_db() {
    echo -e "${BLUE}[DB] Conectando ao PostgreSQL...${NC}"
    docker-compose exec postgres psql -U meta_dev -d meta_educacao_dev
}

# Comando: backup
cmd_backup() {
    echo -e "${BLUE}[BACKUP] Fazendo backup do banco...${NC}"
    docker-compose exec postgres pg_dump -U meta_dev -d meta_educacao_dev > "backup_$(date +%Y%m%d_%H%M%S).sql"
    echo -e "${GREEN}[SUCCESS] Backup criado!${NC}"
}

# Comando: setup
cmd_setup() {
    echo -e "${BLUE}[SETUP] Configuração inicial...${NC}"
    
    # Verificar Docker
    check_docker
    
    # Criar .env se não existir
    check_env
    
    # Construir imagens
    echo -e "${YELLOW}[SETUP] Construindo imagens Docker...${NC}"
    docker-compose build
    
    # Iniciar serviços
    echo -e "${YELLOW}[SETUP] Iniciando serviços...${NC}"
    docker-compose up -d
    
    # Aguardar banco ficar pronto
    echo -e "${YELLOW}[SETUP] Aguardando banco de dados...${NC}"
    sleep 10
    
    # Executar migrações
    echo -e "${YELLOW}[SETUP] Executando migrações...${NC}"
    docker-compose exec app npm run db:push
    
    echo -e "${GREEN}[SUCCESS] Configuração inicial concluída!${NC}"
    echo ""
    echo -e "${BLUE}Acesse:${NC}"
    echo "  • Aplicação: http://localhost:5000"
    echo "  • Admin Panel: http://localhost:5001"
    echo "  • Adminer: http://localhost:8080"
}

# Main
main() {
    check_docker
    
    case "${1:-}" in
        start)
            cmd_start
            ;;
        stop)
            cmd_stop
            ;;
        restart)
            cmd_restart
            ;;
        logs)
            cmd_logs
            ;;
        status)
            cmd_status
            ;;
        clean)
            cmd_clean
            ;;
        shell)
            cmd_shell
            ;;
        db)
            cmd_db
            ;;
        backup)
            cmd_backup
            ;;
        setup)
            cmd_setup
            ;;
        *)
            show_usage
            exit 1
            ;;
    esac
}

main "$@"
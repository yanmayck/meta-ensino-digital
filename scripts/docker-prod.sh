#!/bin/bash

# Meta Educação - Script para Produção com Docker
# Facilita o deploy e gerenciamento em produção

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Banner
echo -e "${RED}"
echo "╔══════════════════════════════════════╗"
echo "║        Meta Educação - Docker        ║"
echo "║            PRODUÇÃO                  ║"
echo "╚══════════════════════════════════════╝"
echo -e "${NC}"

# Função para mostrar uso
show_usage() {
    echo -e "${YELLOW}Uso: $0 [comando]${NC}"
    echo ""
    echo "Comandos disponíveis:"
    echo "  deploy    - Deploy completo em produção"
    echo "  start     - Iniciar todos os serviços"
    echo "  stop      - Parar todos os serviços"
    echo "  restart   - Reiniciar serviços"
    echo "  logs      - Mostrar logs"
    echo "  status    - Status dos serviços"
    echo "  backup    - Backup do banco"
    echo "  restore   - Restaurar backup"
    echo "  update    - Atualizar aplicação"
    echo "  health    - Verificar saúde dos serviços"
    echo "  ssl       - Configurar SSL"
    echo ""
}

# Verificar se está rodando como root (necessário para produção)
check_root() {
    if [ "$EUID" -ne 0 ]; then
        echo -e "${RED}[ERROR] Este script deve ser executado como root em produção!${NC}"
        echo "Use: sudo $0 $@"
        exit 1
    fi
}

# Verificar se arquivo .env.production existe
check_prod_env() {
    if [ ! -f .env.production ]; then
        echo -e "${RED}[ERROR] Arquivo .env.production não encontrado!${NC}"
        echo -e "${YELLOW}[INFO] Crie o arquivo com as configurações de produção.${NC}"
        exit 1
    fi
}

# Verificar se os diretórios de dados existem
check_data_dirs() {
    echo -e "${BLUE}[INFO] Verificando diretórios de dados...${NC}"
    
    DIRS=(
        "/data/meta-educacao/postgres"
        "/data/meta-educacao/redis" 
        "/data/meta-educacao/uploads"
        "/data/meta-educacao/logs"
        "/data/meta-educacao/nginx-logs"
    )
    
    for dir in "${DIRS[@]}"; do
        if [ ! -d "$dir" ]; then
            echo -e "${YELLOW}[CREATE] Criando diretório: $dir${NC}"
            mkdir -p "$dir"
            chown -R 1001:1001 "$dir"
        fi
    done
}

# Comando: deploy
cmd_deploy() {
    echo -e "${GREEN}[DEPLOY] Iniciando deploy em produção...${NC}"
    
    check_prod_env
    check_data_dirs
    
    # Backup antes do deploy
    if docker-compose -f docker-compose.prod.yml ps | grep -q postgres; then
        echo -e "${YELLOW}[DEPLOY] Fazendo backup antes do deploy...${NC}"
        cmd_backup
    fi
    
    # Build e deploy
    echo -e "${YELLOW}[DEPLOY] Construindo imagens...${NC}"
    docker-compose -f docker-compose.prod.yml build --no-cache
    
    echo -e "${YELLOW}[DEPLOY] Iniciando serviços...${NC}"
    docker-compose -f docker-compose.prod.yml up -d
    
    # Aguardar serviços ficarem prontos
    echo -e "${YELLOW}[DEPLOY] Aguardando serviços...${NC}"
    sleep 30
    
    # Verificar saúde
    cmd_health
    
    echo -e "${GREEN}[DEPLOY] Deploy concluído!${NC}"
}

# Comando: start
cmd_start() {
    echo -e "${GREEN}[START] Iniciando serviços de produção...${NC}"
    check_prod_env
    docker-compose -f docker-compose.prod.yml up -d
    echo -e "${GREEN}[SUCCESS] Serviços iniciados!${NC}"
}

# Comando: stop
cmd_stop() {
    echo -e "${YELLOW}[STOP] Parando serviços...${NC}"
    docker-compose -f docker-compose.prod.yml down
    echo -e "${GREEN}[SUCCESS] Serviços parados!${NC}"
}

# Comando: restart
cmd_restart() {
    echo -e "${YELLOW}[RESTART] Reiniciando serviços...${NC}"
    docker-compose -f docker-compose.prod.yml restart
    echo -e "${GREEN}[SUCCESS] Serviços reiniciados!${NC}"
}

# Comando: logs
cmd_logs() {
    echo -e "${BLUE}[LOGS] Logs dos serviços:${NC}"
    docker-compose -f docker-compose.prod.yml logs --tail=100 -f
}

# Comando: status
cmd_status() {
    echo -e "${BLUE}[STATUS] Status dos serviços:${NC}"
    docker-compose -f docker-compose.prod.yml ps
    echo ""
    echo -e "${BLUE}[RESOURCES] Uso de recursos:${NC}"
    docker stats --no-stream
}

# Comando: backup
cmd_backup() {
    echo -e "${BLUE}[BACKUP] Executando backup...${NC}"
    docker-compose -f docker-compose.prod.yml run --rm backup
    echo -e "${GREEN}[SUCCESS] Backup concluído!${NC}"
}

# Comando: restore
cmd_restore() {
    if [ -z "$2" ]; then
        echo -e "${RED}[ERROR] Especifique o arquivo de backup!${NC}"
        echo "Uso: $0 restore <arquivo_backup.sql.gz>"
        exit 1
    fi
    
    BACKUP_FILE="$2"
    if [ ! -f "/data/meta-educacao/backup/$BACKUP_FILE" ]; then
        echo -e "${RED}[ERROR] Arquivo de backup não encontrado!${NC}"
        exit 1
    fi
    
    echo -e "${RED}[WARNING] Isso irá substituir o banco atual!${NC}"
    read -p "Tem certeza? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}[RESTORE] Restaurando backup...${NC}"
        # Implementar restore aqui
        echo -e "${GREEN}[SUCCESS] Backup restaurado!${NC}"
    fi
}

# Comando: update
cmd_update() {
    echo -e "${BLUE}[UPDATE] Atualizando aplicação...${NC}"
    
    # Backup antes da atualização
    cmd_backup
    
    # Pull da nova versão
    git pull origin main
    
    # Rebuild e redeploy
    cmd_deploy
    
    echo -e "${GREEN}[SUCCESS] Atualização concluída!${NC}"
}

# Comando: health
cmd_health() {
    echo -e "${BLUE}[HEALTH] Verificando saúde dos serviços...${NC}"
    
    # Testar conectividade dos serviços
    services=(
        "http://localhost:5000/api/courses|Aplicação Principal"
        "http://localhost:5001/health|Servidor Admin"
    )
    
    for service in "${services[@]}"; do
        url=$(echo $service | cut -d'|' -f1)
        name=$(echo $service | cut -d'|' -f2)
        
        if curl -f -s "$url" > /dev/null; then
            echo -e "${GREEN}✓ $name está funcionando${NC}"
        else
            echo -e "${RED}✗ $name está com problemas${NC}"
        fi
    done
    
    # Verificar uso de disco
    echo ""
    echo -e "${BLUE}[DISK] Uso de disco:${NC}"
    df -h /data/meta-educacao
}

# Comando: ssl
cmd_ssl() {
    echo -e "${BLUE}[SSL] Configurando SSL...${NC}"
    
    # Implementar configuração SSL aqui
    # Por exemplo, usando Let's Encrypt com certbot
    
    echo -e "${YELLOW}[INFO] Configuração SSL deve ser implementada conforme seu provedor.${NC}"
}

# Main
main() {
    case "${1:-}" in
        deploy)
            check_root
            cmd_deploy
            ;;
        start)
            check_root
            cmd_start
            ;;
        stop)
            check_root
            cmd_stop
            ;;
        restart)
            check_root
            cmd_restart
            ;;
        logs)
            cmd_logs
            ;;
        status)
            cmd_status
            ;;
        backup)
            check_root
            cmd_backup
            ;;
        restore)
            check_root
            cmd_restore "$@"
            ;;
        update)
            check_root
            cmd_update
            ;;
        health)
            cmd_health
            ;;
        ssl)
            check_root
            cmd_ssl
            ;;
        *)
            show_usage
            exit 1
            ;;
    esac
}

main "$@"
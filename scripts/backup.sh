#!/bin/bash

# Meta Educação - Script de Backup Automático
# Este script faz backup do banco PostgreSQL

set -e

# Configurações
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="meta_educacao_backup_${DATE}.sql"
RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-30}

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}[BACKUP] Iniciando backup do banco Meta Educação...${NC}"

# Verificar se as variáveis necessárias estão definidas
if [ -z "$PGUSER" ] || [ -z "$PGDATABASE" ] || [ -z "$PGHOST" ]; then
    echo -e "${RED}[ERROR] Variáveis de ambiente não configuradas!${NC}"
    echo "Necessário: PGUSER, PGDATABASE, PGHOST"
    exit 1
fi

# Criar diretório de backup se não existir
mkdir -p $BACKUP_DIR

# Executar backup
echo -e "${YELLOW}[BACKUP] Fazendo dump do banco ${PGDATABASE}...${NC}"
if pg_dump -h $PGHOST -U $PGUSER -d $PGDATABASE > "${BACKUP_DIR}/${BACKUP_FILE}"; then
    echo -e "${GREEN}[BACKUP] Backup criado com sucesso: ${BACKUP_FILE}${NC}"
    
    # Comprimir o backup
    echo -e "${YELLOW}[BACKUP] Comprimindo backup...${NC}"
    gzip "${BACKUP_DIR}/${BACKUP_FILE}"
    echo -e "${GREEN}[BACKUP] Backup comprimido: ${BACKUP_FILE}.gz${NC}"
    
    # Remover backups antigos
    echo -e "${YELLOW}[BACKUP] Removendo backups antigos (>${RETENTION_DAYS} dias)...${NC}"
    find $BACKUP_DIR -name "meta_educacao_backup_*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    # Mostrar estatísticas
    BACKUP_SIZE=$(du -h "${BACKUP_DIR}/${BACKUP_FILE}.gz" | cut -f1)
    TOTAL_BACKUPS=$(ls -1 "${BACKUP_DIR}"/meta_educacao_backup_*.sql.gz 2>/dev/null | wc -l)
    
    echo -e "${GREEN}[BACKUP] Backup concluído com sucesso!${NC}"
    echo -e "${GREEN}[INFO] Tamanho do backup: ${BACKUP_SIZE}${NC}"
    echo -e "${GREEN}[INFO] Total de backups: ${TOTAL_BACKUPS}${NC}"
    
else
    echo -e "${RED}[ERROR] Falha ao criar backup!${NC}"
    exit 1
fi

echo -e "${GREEN}[BACKUP] Processo finalizado.${NC}"
#!/usr/bin/bash

echo "Iniciando exportação de banco de dados."
CONTAINER_NAME="server-pg-pro-1"

docker exec "$CONTAINER_NAME" pg_dumpall -U postgres > ./my_backup.sql

echo "Done!"


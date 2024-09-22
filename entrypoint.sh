#!/bin/sh

# Substitui as variáveis de ambiente no arquivo de configuração do Nginx
# envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

# Substitui as variáveis no arquivo index.html ou onde for necessário
envsubst < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html

# Inicia o Nginx
# nginx -g 'daemon off;'

# Inicia o servidor Vite
exec "$@"
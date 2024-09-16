FROM nginx:1.26.2-alpine

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY dist /usr/share/nginx/html

# Copia o script de inicialização do Nginx
# COPY entrypoint.sh /entrypoint.sh

# Concede permissão de execução ao script
# RUN chmod +x /entrypoint.sh

# Define o entrypoint
# ENTRYPOINT ["/entrypoint.sh"]
  #!/bin/sh

  # Substitui as variáveis de ambiente no arquivo de configuração do Nginx
  envsubst '$BACKEND_URL' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf

  # Inicia o Nginx
  nginx -g 'daemon off;'
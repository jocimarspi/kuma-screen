FROM node:20.12.1-slim as build

WORKDIR build-app

COPY . .

RUN npm ci

RUN npm run build --omit=dev

FROM nginx:stable-alpine3.17-slim

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/resolver.envsh /docker-entrypoint.d/15-resolver.envsh
RUN chmod +x /docker-entrypoint.d/15-resolver.envsh

COPY --from=build build-app/dist /usr/share/nginx/html
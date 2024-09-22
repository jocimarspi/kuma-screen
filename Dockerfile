FROM node:20.12.1-slim as build

WORKDIR build-app

COPY . .

RUN npm ci

RUN npm run build --omit=dev

FROM nginx:stable-alpine3.17-slim

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=build build-app/dist /usr/share/nginx/html
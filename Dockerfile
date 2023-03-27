FROM node:16.19-alpine

WORKDIR /app
COPY / /app/
RUN chmod +x entrypoint.production.sh
RUN npm run build

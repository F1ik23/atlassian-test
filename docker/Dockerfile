
FROM node:20-alpine AS base

WORKDIR /app

COPY forge/package*.json ./
COPY forge/static/package*.json ./static/

RUN npm install -g @forge/cli ts-node
RUN npm install

RUN addgroup -g 1001 -S nodejs
RUN adduser -S forge -u 1001 -G nodejs

COPY --chown=forge:nodejs forge/ .

WORKDIR /app/static
RUN npm install
RUN npm run build

USER forge

EXPOSE 3000

CMD ["forge", "tunnel", "--verbose"]

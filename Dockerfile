FROM docker.io/library/node:16-alpine

WORKDIR /app

COPY . .

VOLUME [ "/app/uploads" ]

EXPOSE 4000

CMD [ "npm", "run", "dev" ]

# Obs: em versões mais atigas do docker compose é preciso atribuir o ` - ` ex: (docker-compose)
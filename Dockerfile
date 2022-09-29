FROM docker.io/library/node:16-alpine

WORKDIR /app

COPY . .

VOLUME [ "/app/uploads" ]

EXPOSE 4000


CMD [ "npm", "start" ]

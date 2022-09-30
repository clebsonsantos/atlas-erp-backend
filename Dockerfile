FROM docker.io/library/node:16-alpine

WORKDIR /app

COPY package.json ./

RUN npm install \
     npm run build

COPY . .

VOLUME [ "/app/uploads" ]

EXPOSE 4000

CMD [ "npm", "start" ]

FROM docker.io/library/node:14.17.6-alpine3.13 

WORKDIR /app

COPY . .


RUN npm install yarn 
RUN yarn install

VOLUME [ "/app/uploads" ]

EXPOSE 4000

CMD [ "yarn", "start" ]


# CRIAR IMAGEM=> docker image build -t server-expenses:1.0 .
# Subir container-compose=>  docker compose up -d
# derrubar todos os container que subi deste diretorio => docker compose down

# ssh root@000.000.000.00
# tar -xvf nome.tar.gz (mover arquivo compactado via ssh e descompactar:) 
# docker ps container ls -a (lista todos os containers)
# docker compose logs -f (ver quais processos estão rodando)
# docker compose ps (lista os container startados)

# Obs: em versões mais atigas do docker compose é preciso atribuir o ` - ` ex: (docker-compose)
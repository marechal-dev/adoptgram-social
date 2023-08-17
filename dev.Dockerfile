FROM node:lts-alpine

RUN apk add musl

ENV NODE_ENV development

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]

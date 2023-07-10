FROM node:lts-alpine

RUN apk install musl

WORKDIR /usr/app

COPY package*.json .

RUN npm install

RUN npm install prisma

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

FROM node:lts-alpine

RUN apk add musl

ENV NODE_ENV production

WORKDIR /usr/app

COPY package*.json .

RUN npm ci --production \
  npm install prisma @nestjs/cli @swc/cli @swc/core -D

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]

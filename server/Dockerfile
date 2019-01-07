FROM node:latest

RUN mkdir -p /app/src
RUN apt-get update
RUN apt-get install --yes bash

WORKDIR /app

ADD . /app
ADD package.json /app/package.json

RUN npm ci --silent

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

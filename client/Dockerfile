FROM node:latest

RUN mkdir -p /app/src
RUN apt-get update
RUN apt-get install --yes bash

WORKDIR /app

# If you have native dependencies, you'll need extra tools
# RUN apk add --no-cache make gcc g++ python

# install and cache app dependencies
ADD package.json /app/package.json
ADD package-lock.json /app/package-lock.json
RUN npm ci --silent

EXPOSE 1233
EXPOSE 1234
EXPOSE 38771
CMD ["npm", "run", "start:dev"]

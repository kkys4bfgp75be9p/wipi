FROM node:10.19.0-alpine

RUN mkdir -p /usr/src/wipi-api

WORKDIR /usr/src/wipi-api

COPY package.json /usr/src/wipi-api/

# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

RUN npm i npm@latest -g

RUN npm i pm2 -g

RUN npm i -g @nestjs/cli

RUN npm i --production

# RUN npm i --production --registry=https://registry.npm.taobao.org

COPY . /usr/src/wipi-api

RUN npm run build

EXPOSE 4000

CMD pm2-runtime start npm --name server -- start

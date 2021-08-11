FROM strapi/base:12

WORKDIR /src/app

COPY ./package.json ./
COPY ./yarn.lock ./


RUN yarn install

COPY . ./


RUN yarn build

ENTRYPOINT pm2 start server.js --no-daemon -i 5

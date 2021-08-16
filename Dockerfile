FROM strapi/base:12

WORKDIR /src/app

COPY ./package.json ./
COPY ./yarn.lock ./


RUN yarn install

COPY . ./

RUN yarn build

ENTRYPOINT yarn start

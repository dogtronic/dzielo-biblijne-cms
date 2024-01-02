# FROM strapi/base:12

# WORKDIR /src/app

# COPY ./package.json ./
# COPY ./yarn.lock ./

# RUN yarn global add pm2


# RUN yarn install

# COPY . ./


# RUN yarn build

# ENTRYPOINT pm2 start server.js --no-daemon -i 5

FROM node:12-alpine

WORKDIR /src/app

COPY . .

RUN npm i --production && npm run build

EXPOSE 1337

CMD ["node", "server.js"]

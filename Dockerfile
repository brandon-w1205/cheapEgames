FROM node:15

WORKDIR /src

COPY package.json package*.json ./

RUN npm install

RUN npm install sequelize-cli

COPY . .

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 3002

ENTRYPOINT ["/docker-entrypoint.sh"]
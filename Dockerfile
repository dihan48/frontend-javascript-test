FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

WORKDIR /usr/src/app/server

CMD [ "node", "server.js" ]
FROM node:8.11

ADD . src/app
WORKDIR src/app

COPY package*.json ./
RUN npm install

COPY . .

CMD [ "npm", "start" ]
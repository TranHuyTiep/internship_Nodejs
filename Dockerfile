FROM node:8.7.0

MAINTAINER vietdl <phamviet008@gmail.com>

WORKDIR /usr/src/internship_Nodejs

COPY package*.json ./

RUN npm install
RUN npm install -g typescript

COPY . .

CMD ["npm","start"]
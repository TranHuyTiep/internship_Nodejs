FROM node:8.7.0

MAINTAINER Tran-Huy-Tiep

RUN mkdir -p /usr/nodejs_intership
WORKDIR /usr/nodejs_intership

COPY ./package.json /usr/nodejs_intership

RUN npm install
RUN npm install -g typescript

COPY . /usr/nodejs_intership

EXPOSE 3000

CMD ["npm","start"]
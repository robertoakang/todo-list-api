FROM node:14.17.3-alpine3.14

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i 

COPY . . 

CMD ["npm", "run", "start"]

FROM node:alpine

RUN mkdir -p /app
WORKDIR /app

ADD index.js ./
ADD package.json ./
RUN npm install

CMD ["npm", "start"]
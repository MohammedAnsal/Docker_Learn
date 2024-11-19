FROM node:18-alpine

WORKDIR /user

COPY  package.json ./

RUN npm install

COPY . . 

EXPOSE 4001

CMD ["node" , "index.js"]
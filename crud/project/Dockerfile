FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 6006

CMD ["npm", "start"]

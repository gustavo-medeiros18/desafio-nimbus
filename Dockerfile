FROM node:20.10.0

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm ci 

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "host" ]
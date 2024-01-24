FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm ci 

RUN npm run build

RUN npm install serve --global

EXPOSE 5173

CMD [ "serve","-s","dist" ]

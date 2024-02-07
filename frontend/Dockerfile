FROM node:18

WORKDIR /usr/src/app

COPY . .

RUN npm ci --legacy-peer-deps --only=production

RUN npm run build

RUN npm install --global serve

RUN chmod -R 755 /usr/src/app

CMD ["npx","serve","-s","dist"]

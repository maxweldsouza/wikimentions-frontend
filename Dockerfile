FROM node:6.9
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./
#RUN npm install

COPY . .

RUN npm run build
EXPOSE 8000

CMD ["node", "server.js"]

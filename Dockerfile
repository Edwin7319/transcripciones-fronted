FROM node:18

LABEL authors="edwin"

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod
EXPOSE 80
CMD ["npm", "start"]

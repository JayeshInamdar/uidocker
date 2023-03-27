FROM node:18.15.0-alpine3.16
WORKDIR /app
COPY ./src/ ./
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]

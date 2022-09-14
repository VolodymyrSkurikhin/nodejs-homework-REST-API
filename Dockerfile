FROM node:slim
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["npm","run","start:dev"]

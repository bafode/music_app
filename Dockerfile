#dev stage
FROM node:lts-alpine as dev

LABEL maintainer="bafode.camara@my-digital-school.org"

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD npm start


#build stage
FROM node:lts-alpine as build

WORKDIR /src

ENV PATH /node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silent

COPY . ./

RUN npm run build

#prod stage
FROM nginx:alpine as prod

COPY --from=build /src/build /usr/share/nginx/html

EXPOSE 80
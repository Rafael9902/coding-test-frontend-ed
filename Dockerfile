#First
FROM node as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Second
FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/frontend /usr/share/nginx/html
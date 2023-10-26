# STAGE 1: Build
FROM node:alpine as build-step

RUN mkdir -p /app

RUN npm cache clear --force

WORKDIR /app

COPY package.json /usr/src/app

RUN npm install

COPY . /app

RUN npm run build

# STAGE 2: Run
FROM nginx

COPY --from=build-step /app/public /usr/share/nginx/html

EXPOSE 9000

STOPSIGNAL SIGTERM

CMD [ "nginx", "-g", "daemon off;" ]
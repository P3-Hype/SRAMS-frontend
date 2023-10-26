FROM alpine:3.18.4

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY frontend/package.json /usr/src/app

RUN apk add --no-cache nodejs npm

RUN npm install

COPY frontend /usr/src/app

EXPOSE $PORT

CMD [ "npm", "run", "dev" ]
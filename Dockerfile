# STAGE 1: Build
FROM node:21.1.0-alpine3.17 as react-build

RUN npm cache clear --force

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

RUN npm run build

# STAGE 2: Run
FROM nginx:1.25.3-alpine3.18

COPY --from=react-build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
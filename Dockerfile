FROM node:lts
WORKDIR /react
COPY package.json ./
RUN yarn
COPY . .
RUN yarn build
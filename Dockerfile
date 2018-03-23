FROM node:8.8

WORKDIR /app

RUN npm i -g serve && \
  npm i -g react-scripts

ADD package.json /app
ADD .eslintrc /app

RUN npm i

ADD . .

RUN npm run build

ENTRYPOINT ["serve", "-s", "build", "-p", "80"]

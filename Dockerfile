FROM node:16.15

RUN mkdir -p /services/app/tps-client
WORKDIR /services/app/tps-client

COPY package.json /services/app/tps-client
COPY yarn.lock /services/app/tps-client

RUN yarn install

COPY . /services/app/tps-client

CMD ["yarn", "start"]

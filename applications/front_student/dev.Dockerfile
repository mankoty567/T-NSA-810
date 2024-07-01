FROM mhart/alpine-node:11 AS builder


RUN addgroup -S app && adduser -S app -G app

WORKDIR /app
COPY . .

RUN yarn install --ignore-scripts

USER app

CMD ["yarn", "start"]
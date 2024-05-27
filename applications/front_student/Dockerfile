FROM mhart/alpine-node:11 AS builder

RUN  addgroup -d /home/app -m -s /bin/bash app

WORKDIR /app
COPY ./ .
RUN yarn install --ignore-scripts
RUN yarn build
WORKDIR /app
COPY --from=builder /app/build .

USER app
CMD ["serve", "-p", "80", "-s", "."]
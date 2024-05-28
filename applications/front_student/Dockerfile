FROM mhart/alpine-node:11 AS builder

WORKDIR /app
COPY . .
RUN yarn install --ignore-scripts
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.25-bookworm-perl AS app

WORKDIR /app

COPY --from=builder /app/build /usr/share/nginx/html

USER nginx
FROM mhart/alpine-node:11 AS builder

ARG API_URL="http://localhost:3000"
ENV REACT_APP_API_URL=${API_URL}

WORKDIR /app
COPY . .
RUN yarn install --ignore-scripts
RUN yarn build

FROM nginxinc/nginx-unprivileged:1.25-bookworm-perl AS app

COPY --from=builder /app/build /usr/share/nginx/html

USER nginx
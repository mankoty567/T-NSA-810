FROM mhart/alpine-node:11 AS builder

RUN mkdir -p /usr/src/app && apk update && apk upgrade

RUN apk add --no-cache bash curl gnupg

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN yarn install --ignore-scripts 

RUN yarn tsc

FROM mhart/alpine-node:11 AS app

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build ../app

COPY --from=builder  /usr/src/app/package.json ../app

COPY ./src/migration/.env /usr/src/app/migration

COPY ./.env  /usr/src/app/

COPY ./ormconfig.js /usr/src/app/

RUN addgroup -S app && adduser -S app -G app  &&  apk update && apk upgrade

RUN apk add --no-cache bash curl gnupg

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN yarn --version

RUN npm install -g --unsafe-perm ts-node typescript 

RUN yarn install --ignore-scripts 

USER app

EXPOSE 3000

#RUN yarn migration:start

#RUN yarn schema:sync 

#RUN yarn ts-node ./node_modules/typeorm/cli.js migration:run

#EXPOSE 3306

CMD ["yarn", "prod"]

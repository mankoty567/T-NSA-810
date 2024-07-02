require('dotenv').config();
const path = require('path');

module.exports = {
   type: "mysql",
   host: process.env.DB_HOST,
   port: 3002,
   role: process.env.ROLE,
   username: process.env.USE,
   password: process.env.PASSWORD,
   database: process.env.DB_NAME,
   synchronize: true,
   logging: false,
   migrationsRun: true,
   entities: [
      "src/entity/**/*.ts"
   ],
   migrations: [
      "src/migration/**/*.ts"
   ],
   subscribers: [
      "src/subscriber/**/*.ts"
   ],
   cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
   }
};


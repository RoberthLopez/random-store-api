import { newConfig } from "../config/newConfig";
const USER = encodeURIComponent(newConfig.dbUser as string);
const PASSWORD = encodeURIComponent(newConfig.dbPassword as string);
const URI = `postgres://${USER}:${PASSWORD}@${newConfig.dbHost}:${newConfig.dbPort}/${newConfig.dbName}`;

const config = {
  development: {
    url: URI,
    dialect: "postgres",
  },
  production: {
    url: URI,
    dialect: "postgres",
  },
};

module.exports = config;

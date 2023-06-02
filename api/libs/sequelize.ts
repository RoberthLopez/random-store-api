import { Sequelize } from "sequelize-typescript";
import { newConfig } from "../config/newConfig";

const USER = encodeURIComponent(newConfig.dbUser as string);
const PASSWORD = encodeURIComponent(newConfig.dbPassword as string);
const URI: string = `postgres://${USER}:${PASSWORD}@${newConfig.dbHost}:${newConfig.dbPort}/${newConfig.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: "postgres",
});

export { sequelize };

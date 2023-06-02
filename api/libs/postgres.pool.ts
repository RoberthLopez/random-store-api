import { Pool } from "pg";

const config = require("../config/newConfig");

const USER = encodeURIComponent(config.dbUser as string);
const PASSWORD = encodeURIComponent(config.dbPassword as string);
const URI: string = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const pool: Pool = new Pool({
  connectionString: URI,
});

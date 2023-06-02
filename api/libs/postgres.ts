import { Client } from "pg";

export async function getConnection() {
  const client: Client = new Client({
    host: "localhost",
    port: 5432,
    user: "roberth",
    password: "admin123",
    database: "my_store",
  });
  await client.connect();
  return client;
}

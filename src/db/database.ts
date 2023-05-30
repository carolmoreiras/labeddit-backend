import knex from "knex";
import { enviroments } from "../helpers/enviroments";

export const connectDB = knex({
  client: "sqlite3",
  connection: {
    filename: enviroments.dbPath
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 1,
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb)
    }
  }
})
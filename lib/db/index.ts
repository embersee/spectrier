// import { drizzle } from "drizzle-orm/planetscale-serverless";
// import { connect } from "@planetscale/database";
// import * as schema from "./schema";

// // create database connection
// const connection = connect({
//   url: process.env.DATABASE_URL,
// });

// export const db = drizzle(connection, { schema });

import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const queryClient = postgres(`${process.env.DATABASE_URL}`, {
  ssl: "require",
});
export const db = drizzle(queryClient, { schema });

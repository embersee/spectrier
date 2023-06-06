import type { Config } from "drizzle-kit";

import "dotenv/config";

export default {
  schema: "./lib/db/schema.ts",
  out: "./lib/db/migrations",
  connectionString: process.env.DATABASE_URL,
  breakpoints: true,
} satisfies Config;

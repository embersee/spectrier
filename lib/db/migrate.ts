import { drizzle, PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import "dotenv/config";

// inspired by Raphael Moreau @rphlmr for Postgres, extended for Planetscale
const runMigrate = async () => {
  const migrationClient = postgres(`${process.env.DATABASE_URL}`, {
    ssl: "require",
    max: 1,
  });

  console.log("⏳ Running migrations...");

  const start = Date.now();

  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./lib/db/migrations",
  });

  const end = Date.now();

  console.log(`✅ Migrations completed in ${end - start}ms`);

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});

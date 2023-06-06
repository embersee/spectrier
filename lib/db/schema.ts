import { mysqlTable, serial, text, varchar, int } from "drizzle-orm/mysql-core";

/**
 * This is a sample schema.
 * Replace this with your own schema and then run migrations.
 */

export const user = mysqlTable("user", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
  telegramId: varchar("telegramId", { length: 256 }),
});

import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  telegramId: varchar("telegramId", { length: 256 }).notNull(),
});

export const category = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const categoryRelations = relations(category, ({ many }) => ({
  product: many(category),
}));

export const product = pgTable("product", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  discount: integer("discount").notNull(),
  stock: integer("stock").notNull(),
  image: text("image").notNull(),
  createdAt: date("createdAt").notNull().defaultNow(),
  updatedAt: date("updatedAt"),
  categoryID: integer("categoryID").references(() => category.id),
});

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categoryID],
    references: [category.id],
  }),
}));

export type Product = InferModel<typeof product>;
export type NewProduct = InferModel<typeof product, "insert">;

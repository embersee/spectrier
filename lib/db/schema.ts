import { InferModel, relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  integer,
  pgEnum,
  primaryKey,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  telegramId: varchar("telegramId", { length: 256 }).notNull(),
  username: varchar("username", { length: 256 }).notNull(),
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
  nameKZ: text("nameKZ").notNull().default(""),
  description: text("description").notNull(),
  descriptionKZ: text("descriptionKZ").notNull().default(""),
  price: integer("price").notNull(),
  discount: integer("discount").notNull(),
  stock: integer("stock").notNull(),
  imageOne: text("imageOne").notNull(),
  imageTwo: text("imageTwo"),
  imageThree: text("imageThree"),
  imageFour: text("imageFour"),
  imageFive: text("imageFive"),
  createdAt: date("createdAt").notNull().defaultNow(),
  updatedAt: date("updatedAt"),
  categoryID: integer("categoryID").references(() => category.id),
  active: boolean("active").default(true),
});

export const productRelations = relations(product, ({ one }) => ({
  category: one(category, {
    fields: [product.categoryID],
    references: [category.id],
  }),
}));

export const orderStatusEnum = pgEnum("orderstatus", [
  "created",
  "failed",
  "cancelled",
  "successful",
  "delivery",
  "complete",
]);
export const paymentTypeEnum = pgEnum("paymenttype", ["telegram", "support"]);
export const paymentStatusEnum = pgEnum("paymentstatus", [
  "incomplete",
  "failed",
  "complete",
  "refunded",
]);

export const order = pgTable("order", {
  id: serial("id").primaryKey(),
  userId: integer("userId").references(() => user.id),
  createdAt: date("createdAt").defaultNow(),
  comment: text("comment"),
  orderStatus: orderStatusEnum("orderstatus"),
  address: text("address"),
  paymentType: paymentTypeEnum("paymenttype"),
  paymentStatus: paymentStatusEnum("paymentstatus"),
  totalSum: integer("totalSum"),
});

export const userRelations = relations(user, ({ many }) => ({
  orders: many(order),
}));

export const userOrdersRelations = relations(order, ({ one }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
}));

export const productsToOrders = pgTable(
  "productsToOrders",
  {
    orderId: integer("orderId")
      .notNull()
      .references(() => order.id),
    productId: integer("productId")
      .notNull()
      .references(() => product.id),
    quantity: integer("quantity"),
  },
  (t) => ({
    pk: primaryKey(t.orderId, t.productId),
  })
);

export const productsToOrdersRelations = relations(
  productsToOrders,
  ({ one }) => ({
    order: one(order, {
      fields: [productsToOrders.orderId],
      references: [order.id],
    }),
    product: one(product, {
      fields: [productsToOrders.productId],
      references: [product.id],
    }),
  })
);

export const orderRelations = relations(order, ({ many }) => ({
  productsToOrders: many(productsToOrders),
}));

export const productOrderRelations = relations(product, ({ many }) => ({
  productsToOrders: many(productsToOrders),
}));

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  postText: text("postText").notNull(),
  createdAt: date("createdAt").notNull().defaultNow(),
  postImageURL: text("postImageURL").notNull(),
  sent: boolean("sent").default(false),
  active: boolean("active").default(true),
});

export const link = pgTable("link", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull(),
  createdAt: date("createdAt").notNull().defaultNow(),
  active: boolean("active").default(true),
  reponses: integer("responses").notNull().default(0),
});

export type User = InferModel<typeof user>;
export type NewUser = InferModel<typeof user, "insert">;

export type Category = InferModel<typeof category>;

export type Product = InferModel<typeof product>;
export type NewProduct = InferModel<typeof product, "insert">;

export type Order = InferModel<typeof order>;
export type NewOrder = InferModel<typeof order, "insert">;

export type ProductsToOrders = InferModel<typeof productsToOrders>;
export type NewProductsToOrders = InferModel<typeof productsToOrders, "insert">;

export type Post = InferModel<typeof post>;
export type NewPost = InferModel<typeof post, "insert">;

export type Link = InferModel<typeof link>;
export type NewLink = InferModel<typeof link, "insert">;

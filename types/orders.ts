import { Order, Product, User } from "@/lib/db/schema";
import { orderProduct, storeProduct } from "./products";

export type Orders = {
  order: Order;
  product: orderProduct[];
  user: User;
};

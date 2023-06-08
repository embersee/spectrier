import { Category, Product } from "@/lib/db/schema";

export interface Products extends Product {
  category: Category;
}

export interface storeProduct extends Product {
  quantity?: number;
  category: Category;
}

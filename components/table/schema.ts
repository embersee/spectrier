import { z } from "zod";

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discount: z.number(),
  stock: z.number(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type productForm = z.infer<typeof productSchema>;

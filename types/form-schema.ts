import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string(),
  category: z.string(),
  price: z.coerce.number().min(1),
  discount: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
});

export const productUpdateSchema = z.object({
  id: z.number(),
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string(),
  category: z.string(),
  price: z.coerce.number().min(1),
  discount: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  imageOne: z.string(),
  imageTwo: z.string().nullish().default(""),
  imageThree: z.string().nullish().default(""),
  imageFour: z.string().nullish().default(""),
  imageFive: z.string().nullish().default(""),
});

export const linkSchema = z.object({
  name: z.string().min(3, {
    message: "Link name must be at least 3 characters.",
  }),
  code: z.string().min(4, {
    message: "Code must be at least 4 characters long.",
  }),
});

export type LinkForm = z.infer<typeof linkSchema>;

export type ProductFormUpdate = z.infer<typeof productUpdateSchema>;
export type ProductForm = z.infer<typeof productSchema>;

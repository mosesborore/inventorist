import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string(),
  category: z.string(),
  supplier: z.string(),
  tags: z.string(),
});

export type AddProductType = z.infer<typeof ProductSchema>;

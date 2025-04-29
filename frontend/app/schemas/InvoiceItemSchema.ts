import { z } from "zod";

export const InvoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.coerce
    .number()
    .nonnegative("Quantity must be a positive number")
    .min(1, "Quantity must be at least 1")
    .default(1),
  unit_price: z.coerce.number().nonnegative("Unit price must be 0 or greater"),
  total: z.coerce
    .number()
    .nonnegative("Total must be a positive number")
    .default(0)
    .optional(),
});

export type InvoiceItemSchemaType = z.infer<typeof InvoiceItemSchema>;

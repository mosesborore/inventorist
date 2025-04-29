import { z } from "zod";

export const CreateInvoiceSchema = z.object({
  date: z.coerce.string().min(1, "Date is required"),
  dueDate: z.coerce.string().optional(),
  total: z.coerce
    .number()
    .nonnegative("Total must be a positive number")
    .default(0)
    .optional(),
  notes: z.string().optional(),
  buyerName: z.string().min(1, "Buyer name is required"),
  buyerPhone: z
    .string()
    .min(10, "The phone number is incomplete")
    .max(12, "the phone number is to long"),
});

export type CreateInvoiceSchemaType = z.infer<typeof CreateInvoiceSchema>;

export const InvoiceSchema = z.object({
  date: z.coerce.date(),
  due_date: z.coerce.string().optional(),
  total: z.coerce
    .number()
    .nonnegative("Total must be a positive number")
    .default(0)
    .optional(),
  notes: z.string().optional(),
  buyerName: z.string().min(1, "Buyer name is required"),
  buyerPhone: z
    .string()
    .min(10, "The phone number is incomplete")
    .max(12, "the phone number is to long"),
});

// payment_status: z.enum(["UNPAID", "PAID"]),

export type InvoiceSchemaType = z.infer<typeof InvoiceSchema>;

export const SellerSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Seller name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email(),
  phone: z
    .string()
    .min(10, "The phone number is incomplete")
    .max(12, "the phone number is to long"),
});

export const BuyerSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, "Seller name is required"),
  address: z.string().optional(),
  email: z.string().email().optional(),
  phone: z
    .string()
    .min(10, "The phone number is incomplete")
    .max(12, "the phone number is to long"),
});

export type SellerSchemaType = z.infer<typeof SellerSchema>;
export type BuyerSchemaType = z.infer<typeof BuyerSchema>;

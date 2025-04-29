import { z } from "zod";

// export const AddVariantSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   price: z.coerce.number().nonnegative("Price must be 0 or more"),
//   barginPrice: z.coerce.number().nonnegative("Lowest Price must be 0 or more"),
//   quantity: z.string().min(1, "Quantity is required"),
//   units: z.coerce.number().nonnegative("Price must be 0 or more"),
// });

// export type AddVariantType = z.infer<typeof AddVariantSchema>;

export const VariantSchema = z
  .object({
    name: z.string().min(1, "Name should have a value"),
    price: z.coerce.number().nonnegative("Price must be a positive number"),
    bargainPrice: z.coerce
      .number()
      .nonnegative("Lowest Price must be 0 or more"),
    quantity: z.string(),
    units: z.coerce.number().nonnegative("Lowest Price must be 0 or more"),
  })
  .refine(
    (values) => {
      return values.bargainPrice <= values.price;
    },
    {
      message: "Bargain Price be less than the actual Price",
      path: ["bargain_prie"],
    },
  );

export type AddVariantType = z.infer<typeof VariantSchema>;

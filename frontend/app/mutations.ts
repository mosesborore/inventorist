import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { buildURLWithBase } from "@/lib/utils";
import toast from "react-hot-toast";
import { SellerSchemaType } from "@/schemas/InvoiceSchema";
import { AddVariantType } from "@/schemas/VariantSchema";

export const useCreateSeller = () => {
  const url = buildURLWithBase("/invoices/seller");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: SellerSchemaType) => {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to create seller");
      }
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Seller Created Successfully");
      queryClient.invalidateQueries({ queryKey: ["sellers"] });
    },
    onError: (err: Error) => {
      toast.error(err?.message || "Error creating Seller");
    },
  });
};

// interface CreateVariant {
//   data: AddVariantType;
// }

export const useCreateProductVariant = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AddVariantType) => {
      const url = buildURLWithBase(`/products/${productId}/variants`);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          price: data.price,
          bargain_price: data.bargainPrice,
          quantity: data.quantity,
          units: data.units,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to Create Product Variant");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", productId],
      });
      toast.success("Product Variant Created Successfully");
    },
    onError: (err: Error) => {
      toast.error(err?.message || "Error creating Seller");
    },
  });
};

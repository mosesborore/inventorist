import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildURLWithBase } from "./lib/utils";
import toast from "react-hot-toast";
import { SellerSchemaType } from "./schemas/InvoiceSchema";

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

export const useCreateInvoice = () => {
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

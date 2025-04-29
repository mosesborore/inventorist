import { useQuery } from "@tanstack/react-query";
import { buildURLWithBase } from "./lib/utils";
import { BuyerSchemaType, SellerSchemaType } from "./schemas/InvoiceSchema";
import { InvoiceItemSchemaType } from "./schemas/InvoiceItemSchema";

export const useGetSeller = () => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const url = buildURLWithBase("/invoices/seller");
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      return (await res.json()) as SellerSchemaType;
    },
  });
};

interface Invoice {
  date: Date;
  buyerName: string;
  buyerPhone: string;
  due_date?: string | undefined;
  total: number;
  notes: string;
  items: InvoiceItemSchemaType[];
  seller: SellerSchemaType;
  buyer: BuyerSchemaType;
}
export const useGetInvoice = (invoiceNumber: string) => {
  return useQuery({
    queryKey: ["invoices", invoiceNumber],
    queryFn: async () => {
      const url = buildURLWithBase(`/invoices/${invoiceNumber}`);
      const res = await fetch(url, {
        method: "GET",
      });
      return (await res.json()) as Invoice;
    },
  });
};

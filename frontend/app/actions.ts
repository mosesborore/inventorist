"use server";

import { redirect } from "next/navigation";
import { buildURLWithBase } from "./lib/utils";
import { InvoiceSchema } from "./schemas/InvoiceSchema";

export const createInvoice = async (prevState, formData: FormData) => {
  const data = {
    date: formData.get("date"),
    due_date: formData.get("due_date"),
    buyer_id: formData.get("buyer"),
    total: formData.get("total"),
    notes: formData.get("notes"),
  };

  const validated_data = InvoiceSchema.safeParse(data);
  console.log(validated_data.success, validated_data.data);

  const url = buildURLWithBase("/invoices/");
  const resp = await fetch(url, {
    method: "POST",
    body: JSON.stringify(validated_data),
  });
  //   console.log(data);
  if (resp.ok) {
    return { description: "ok" };
  } else {
    return { description: `Not OK ${resp.status}` };
  }
};

export async function deleteInvoiceAction(invoiceNumber: string) {
  const url = buildURLWithBase(`/invoices/${invoiceNumber}`);
  const res = await fetch(url, { method: "DELETE" });

  if (!res.ok) {
    const error = await res.json();
    return error?.message || "Failed to delete the invoice";
  }
  redirect("/invoices");
}

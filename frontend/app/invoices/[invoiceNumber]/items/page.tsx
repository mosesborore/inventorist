// import AddItems from "@/components/invoices/AddItems";
import AddInvoiceItems from "@/components/invoices/AddInvoiceItems";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

async function AddItemsPage({
  params,
}: {
  params: Promise<{ invoiceNumber: string }>;
}) {
  const { invoiceNumber } = await params;
  return (
    <>
      <div className="my-2">
        <button className="btn btn-neutral btn-sm flex items-center font-semibold">
          <FaArrowLeft />{" "}
          <Link href={`/invoices/${invoiceNumber}`}>Go back</Link>
        </button>
      </div>
      <AddInvoiceItems />
    </>
  );
}

export default AddItemsPage;

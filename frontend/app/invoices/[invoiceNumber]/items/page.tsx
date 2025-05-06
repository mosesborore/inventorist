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
        <Link href={`/invoices/${invoiceNumber}`}>
          <button className="btn btn-ghost btn-sm my-4 flex items-center font-semibold">
            <FaArrowLeft />
            <span>Go back</span>
          </button>
        </Link>
      </div>

      <AddInvoiceItems />
    </>
  );
}

export default AddItemsPage;

import DeleteInvoice from "@/components/invoices/DeleteInvoice";
import { buildURLWithBase, formatNumber } from "@/lib/utils";
import { InvoiceItemSchemaType } from "@/schemas/InvoiceItemSchema";
import { BuyerSchemaType, SellerSchemaType } from "@/schemas/InvoiceSchema";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function InvoiceHeader({ id }: { id: string }) {
  return (
    <header className="mb-2">
      <h2 className="mb-2 border-b-1 pb-1 font-bold">
        Details for: <span>Invoice {id}</span>
      </h2>
    </header>
  );
}

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
async function InvoicePage({
  params,
}: {
  params: Promise<{ invoiceNumber: string }>;
}) {
  const { invoiceNumber } = await params;
  const url = buildURLWithBase(`/invoices/${invoiceNumber}`);
  const res = await fetch(url, { method: "GET" });

  const invoice = (await res.json()) as Invoice;

  return (
    <div className="p-1">
      <InvoiceHeader id={invoiceNumber} />
      <Link href={`/invoices/`}>
        <button className="btn btn-ghost btn-sm my-4 flex items-center font-semibold">
          <FaArrowLeft size={12} />
          <span>Go back</span>
        </button>
      </Link>
      <div className="flex items-center gap-x-2">
        <button className="btn btn-sm btn-secondary">
          <Link href={`/invoices/${invoiceNumber}/items`}>Add Items</Link>
        </button>
        <DeleteInvoice invoiceNumber={invoiceNumber} />
      </div>
      <section className="border-base-200 mx=-auto mt-5 mb-4 w-full border shadow-md lg:max-w-6xl">
        <ul className="list bg-base-100 rounded-box lg:flex-3/4">
          <li className="text-muted flex flex-col gap-y-2 p-4 pb-2 text-base font-semibold tracking-wide">
            <span className=""> Items for invoice #{invoiceNumber}</span>{" "}
            <div className="inline-block text-sm capitalize">
              <span>Customer: </span>
              <span>{invoice.buyer.name}</span>{" "}
              <span>{invoice.buyer.phone}</span>
            </div>
          </li>
          <li className="list-row flex items-center">
            <div className="text-muted flex-[5%] text-xl font-thin tabular-nums">
              #
            </div>
            <div className="flex-[75%] font-bold md:flex-[85%]">
              <div>Description</div>
            </div>
            <p className="flex items-center font-bold md:flex-[5%]">Total</p>
            <p></p>
          </li>

          {invoice.items.length > 0 ? (
            invoice.items.map((item, index) => {
              return (
                <li className="list-row" key={index}>
                  <div className="text-4xl font-thin tabular-nums opacity-30">
                    {index + 1}
                  </div>
                  <div>
                    <div>{item.description}</div>
                    <div className="text-muted mt-1 flex flex-col gap-y-1 text-xs font-semibold capitalize">
                      <span>Quantity: {item.quantity}</span>{" "}
                      <span>Unit Price: {formatNumber(item.unit_price)}</span>
                    </div>
                  </div>
                  <p className="flex items-center font-bold">
                    {formatNumber(item.total)}
                  </p>
                  <p></p>
                </li>
              );
            })
          ) : (
            <li className="list-row flex items-center">
              <div className="text-muted flex-[5%] text-xl font-thin tabular-nums"></div>
              <div className="flex-[75%] text-center font-bold md:flex-[85%]">
                <div>Not items Found</div>
              </div>
              <p className="flex items-center font-bold md:flex-[5%]"></p>
              <p></p>
            </li>
          )}

          <li className="m-8 flex justify-end text-base font-bold">
            Invoice Total: {formatNumber(invoice.total)}
          </li>
        </ul>
      </section>
    </div>
  );
}

export default InvoicePage;

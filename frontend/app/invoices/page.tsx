import React from "react";
import SellerCard from "@/components/ui/SellerCard";
import { FaSearch } from "react-icons/fa";
import CreateInvoice from "@/components/CreateInvoice";
import { buildURLWithBase } from "@/lib/utils";
import Link from "next/link";

interface InvoiceSummary {
  invoiceNumber: string;
  itemsCount: number;
  total: number;
  buyerName: string;
  date: string;
}
async function InvoicePage() {
  const url = buildURLWithBase("/invoices/summary");
  const res = await fetch(url, { method: "GET" });
  const invoiceSummary = (await res.json()) as InvoiceSummary[];

  return (
    <div className="t flex flex-col gap-4 px-2">
      <div>
        <SellerCard />
      </div>
      <div className="bg-base-100 rounded-lg p-4">
        <span className="text-muted text-xl font-bold">Quick Actions</span>
        <ul className="mt-4 flex items-center gap-10">
          <li className="rounded-full p-1">
            <CreateInvoice />
          </li>
          <li className="size-15 rounded-full p-1">
            <span className="flex-center text-secondary flex-col gap-1 text-sm font-bold">
              <FaSearch size={20} />
              Search
            </span>
          </li>
        </ul>
      </div>
      <section>
        <div className="rounded-box5 bg-base-100 overflow-x-auto p-4">
          <span className="text-muted my-2 text-xl font-bold">
            Recent Invoices
          </span>

          <table className="$$table $$table-zebra mt-4 w-full">
            <thead>
              <tr className="text-start">
                <th className="text-start">Name </th>
                <th className="text-start">No. Items</th>
                <th className="text-start">Total</th>
                <th className="text-start">Date</th>
              </tr>
            </thead>
            <tbody>
              {invoiceSummary.length > 0 ? (
                invoiceSummary.map((summary) => {
                  return (
                    <tr key={summary.invoiceNumber}>
                      <td>
                        <Link href={`/invoices/${summary.invoiceNumber}`}>
                          {summary.buyerName}
                        </Link>
                      </td>

                      <td>{summary.itemsCount}</td>
                      <td>{summary.total}</td>
                      <td>{summary.date}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center font-bold text-red-400"
                  >
                    No Invoices
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default InvoicePage;

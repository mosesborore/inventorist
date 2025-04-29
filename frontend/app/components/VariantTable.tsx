import React from "react";
import { VariantType } from "../types";
import { PenLine, Trash2 } from "lucide-react";

interface VariantTableProps {
  variants: VariantType[];
  productId: number;
}
function VariantTable({ variants, productId }: VariantTableProps) {
  return (
    <section className="overflow-x-auto">
      <table className="table-zebra table-xs table w-full">
        <thead className="text-sm">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Regular price</th>
            <th>Bargain price</th>
            <th>Units</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((variant) => {
            return (
              <tr key={variant.id}>
                <td>{variant.name}</td>
                <td>{variant.quantity}</td>
                <td>{variant.price}</td>
                <td>{variant.bargain_price}</td>
                <td>{variant.units}</td>
                <td className="h-4">
                  <PenLine />
                </td>
                <td className="size-5 text-red-500">
                  <Trash2 />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default VariantTable;

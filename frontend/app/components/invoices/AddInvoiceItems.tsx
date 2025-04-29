"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../commons/InputField";
import Button from "../commons/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvoiceItemSchema,
  InvoiceItemSchemaType,
} from "@/schemas/InvoiceItemSchema";
import { buildURLWithBase, formatNumber } from "@/lib/utils";
import { InvoiceType } from "@/types";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { useGetInvoice } from "@/queries";
import Loader from "../commons/Loader";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface addInvoiceItemFnProps {
  invoiceNumber: string;
  payload: InvoiceItemSchemaType;
}
async function addInvoiceItemFn({
  invoiceNumber,
  payload,
}: addInvoiceItemFnProps) {
  const url = buildURLWithBase(`/invoices/${invoiceNumber}/items`);
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Failed to create invoice item");
  }

  return (await res.json()) as InvoiceType;
}

function AddInvoiceItems() {
  const { invoiceNumber }: { invoiceNumber: string } = useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(InvoiceItemSchema),
    defaultValues: {
      total: 0,
      description: "",
      quantity: 1,
      unit_price: 0,
    },
  });

  const { data, isLoading } = useGetInvoice(invoiceNumber);

  const queryClient = useQueryClient();
  const { mutateAsync: addInvoiceItemMutation } = useMutation({
    mutationFn: addInvoiceItemFn,
    onSuccess: () => {
      toast.success("Invoice item Created Successfully");
      reset();
      queryClient.invalidateQueries({
        queryKey: ["invoices", invoiceNumber],
      });
    },
    onError: (err: Error) => {
      toast.error(err?.message || "Error creating Invoice item");
    },
  });

  const onSubmit: SubmitHandler<InvoiceItemSchemaType> = async (formData) => {
    try {
      const payload = { ...formData };
      await addInvoiceItemMutation({ invoiceNumber, payload });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-base-100 my-2 flex w-full flex-col rounded-md p-3 shadow-md lg:flex-row">
      <div className="md:border-base-300 border-b lg:flex-1/2 lg:border-r lg:border-b-0">
        <div className="pb-4">
          <div className="w-fit font-semibold">Add Item to Invoice </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-sm">
            <InputField
              id="description"
              label="Description"
              inputClassNames="w-3/4"
              register={register}
              placeholder="Item Description"
              errors={errors}
            />
            <InputField
              id="quantity"
              label="Quantity"
              inputClassNames="w-3/4"
              type="number"
              register={register}
              placeholder="Item Quantity"
              errors={errors}
            />
            <InputField
              id="unit_price"
              label="Unit Price"
              type="number"
              inputClassNames="w-3/4"
              register={register}
              placeholder="Item Unit Price"
              errors={errors}
            />
            <InputField
              id="total"
              label="Total"
              type="number"
              inputClassNames="w-3/4"
              register={register}
              placeholder="Item total"
              errors={errors}
            />
            <div className="mt-2">
              <Button
                label={isSubmitting ? "Submitting..." : "Add Item"}
                type="submit"
                className="btn btn-sm btn-primary"
                disabled={isSubmitting}
              ></Button>
            </div>
          </form>
        </div>
      </div>
      <div className="divider divider-horizontal lg:divider-vertical"></div>
      <div className="rounded-box border-base-content/5 w-full overflow-x-auto border px-4 py-2">
        <table className="$$table $$table-zebra $table-sm w-full">
          <thead>
            <tr>
              <th className="text-start">Qtr</th>
              <th className="text-start">Description</th>
              <th className="text-start">Price</th>
              <th className="text-start">Total</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="w-full">
                <td colSpan={4} className="flex w-full justify-center">
                  <Loader message="Loading invoice items" />
                </td>
              </tr>
            ) : data && data.items.length > 0 ? (
              data.items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                    <td>{formatNumber(item.unit_price)}</td>
                    <td>{formatNumber(item.total)}</td>
                  </tr>
                );
              })
            ) : (
              <tr
                aria-colcount={1}
                className="text-muted text-center font-bold"
              >
                <td colSpan={4}>No Items</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="m-10 flex justify-end">
          <p className="text-[1.1rem] font-bold">
            Invoice Total: {formatNumber(data?.total || 0.0)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default AddInvoiceItems;

{
  /*
    
    
    
    <li className="list-row" key={index}>
                <div className="text-4xl font-thin tabular-nums opacity-30">
                  {index + 1}
                </div>
                <div>
                  <div>{item.description}</div>
                  <div className="text-muted mt-1 flex gap-y-1 text-xs font-semibold capitalize">
                    <span>Quantity: {item.quantity}</span>{" "}
                    <span>Unit Price: {item.unit_price}</span>
                  </div>
                </div>
                <p className="flex items-center font-bold">{item.total}</p>
                <p></p>
              </li>*/
}

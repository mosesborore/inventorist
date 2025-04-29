"use client";

import React, { useRef } from "react";
import Modal from "../commons/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { buildURLWithBase } from "@/lib/utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { deleteInvoiceAction } from "@/actions";

interface DeleteInvoiceProps {
  invoiceNumber: string;
}
function DeleteInvoice({ invoiceNumber }: DeleteInvoiceProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteInvoiceMutation } = useMutation({
    mutationFn: async () => {
      const url = buildURLWithBase(`/invoices/${invoiceNumber}`);
      const res = await fetch(url, { method: "DELETE" });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.message || "Failed to delete the invoice");
      }
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
      router.push("/invoices");
      toast.success("Invoice Deleted Successfully");
    },
    onError: (err: Error) => {
      toast.error(err?.message || "Error deleting Invoice");
    },
  });

  async function handleDelete() {
    modalRef.current?.close();

    await deleteInvoiceMutation();
    // const deleteInvoiceActionWithInvoiceNumber = deleteInvoiceAction.bind(
    //   null,
    //   invoiceNumber,
    // );
    // const res = await deleteInvoiceActionWithInvoiceNumber();
    // console.log(res);
    // await deleteInvoiceMutation();
  }

  return (
    <div>
      <button
        className="btn btn-sm btn-warning"
        onClick={() => {
          modalRef.current?.show();
        }}
      >
        Delete this Invoice
      </button>

      <Modal modalRef={modalRef}>
        <h3 className="font-bold">Delete Invoice: {invoiceNumber}</h3>
        <p className="text=sm my-2">
          Are you sure you want to delete the invoice?
        </p>
        <div className="m-1 mx-auto max-w-xs">
          <div className="item-center flex justify-center gap-2">
            <button
              className="btn btn-neutral"
              onClick={() => {
                modalRef.current?.close();
              }}
            >
              Cancel
            </button>
            <button className="btn btn-warning" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DeleteInvoice;

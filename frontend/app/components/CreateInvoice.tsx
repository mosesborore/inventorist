"use client";
import React, { useRef } from "react";
import InvoiceFormModal from "./InvoiceFormModal";
import { FaPlus } from "react-icons/fa";

function CreateInvoice() {
  const modalFormRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="mx-1 my-4">
      <button
        className="flex-center items-center gap-2 text-sm font-bold"
        onClick={() => modalFormRef.current?.showModal()}
      >
        <FaPlus size={20} />
        Create Invoice
      </button>
      <InvoiceFormModal modalFormRef={modalFormRef} />{" "}
    </div>
  );
}

export default CreateInvoice;

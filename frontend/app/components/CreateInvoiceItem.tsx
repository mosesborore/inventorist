"use client";

import { useRef } from "react";
import InvoiceItemFormModal from "./InvoiceItemFormModal";
import { FaPlus } from "react-icons/fa";

export default function CreateInvoiceitem() {
  const modalFormRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="mx-1 my-4">
      <button
        className="flex-center flex-col gap-1 text-sm font-bold"
        onClick={() => modalFormRef.current?.showModal()}
      >
        <FaPlus size={20} />
        Add
      </button>
      <InvoiceItemFormModal modalFormRef={modalFormRef} />{" "}
    </div>
  );
}

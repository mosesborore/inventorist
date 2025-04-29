"use client";
import React, { useRef } from "react";
import AddVariantModalForm from "./AddProductModalForm";

function AddProduct() {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="mx-1 my-4">
      <button
        className="btn btn-sm btn-primary my-2"
        onClick={() => modalRef.current?.showModal()}
      >
        Add Product
      </button>
      <AddVariantModalForm modalFormRef={modalRef} />
    </div>
  );
}

export default AddProduct;

"use client";
import React, { useRef } from "react";
import AddVariantModalForm from "./AddVariantModalForm";
import Button from "./commons/Button";

interface AddVariantProps {
  productId: number;
  productName: string;
}
function AddVariant({ productId, productName }: AddVariantProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <Button
        label="Add Variant"
        className="btn btn-sm btn-primary my-2"
        onClick={() => modalRef.current?.showModal()}
      ></Button>
      <AddVariantModalForm modalFormRef={modalRef} productId={productId} productName={productName} />
    </div>
  );
}

export default AddVariant;

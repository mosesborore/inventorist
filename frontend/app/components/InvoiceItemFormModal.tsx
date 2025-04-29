import React from "react";
import InputField from "./commons/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvoiceItemSchema,
  InvoiceItemSchemaType,
} from "@/schemas/InvoiceItemSchema";
import Button from "./commons/Button";

interface InvoiceModalProps {
  modalFormRef: React.RefObject<HTMLDialogElement | null>;
}
function InvoiceItemFormModal({ modalFormRef }: InvoiceModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceItemSchemaType>({
    resolver: zodResolver(InvoiceItemSchema),
  });

  const onSubmit: SubmitHandler<InvoiceItemType> = (formData) => {
    console.log(formData);
  };
  return (
    <>
      <dialog ref={modalFormRef} id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
              ✕
            </button>
          </form>
          <h3 className="mb-2 text-lg font-bold">Add Item to Invoice </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="description"
              label="Enter"
              errors={errors}
              placeholder="Enter Description"
              register={register}
            />
            <InputField
              id="quentity"
              label="Quantity"
              type="number"
              errors={errors}
              placeholder="Enter Quantity"
              register={register}
            />
            <InputField
              id="unit_price"
              label="Price per Unit"
              type="number"
              errors={errors}
              placeholder="Enter Price per Unit"
              register={register}
            />
            <InputField
              id="total"
              label="Total"
              type="number"
              errors={errors}
              placeholder="Enter Total"
              register={register}
            />

            <div>
              <Button
                label="Add Product to Invoice"
                type="submit"
                className="btn btn-secondary my-4"
                small
              ></Button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default InvoiceItemFormModal;

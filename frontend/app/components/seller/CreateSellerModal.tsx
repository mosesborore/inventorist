"use client";

import React, { useRef } from "react";

import Modal from "../commons/Modal";
import Button from "../commons/Button";
import InputField from "../commons/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
import { SellerSchema, SellerSchemaType } from "@/schemas/InvoiceSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSeller } from "@/mutations";
function CreateModal() {
  const modalRef = useRef<HTMLDialogElement>(null);
  const createSeller = useCreateSeller();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerSchemaType>({
    resolver: zodResolver(SellerSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<SellerSchemaType> = (formData) => {
    createSeller.mutateAsync(formData, {
      onSuccess: () => {
        reset();
        modalRef.current?.close();
      },
    });
  };

  return (
    <div>
      <Button
        label="Create Seller"
        onClick={() => modalRef.current?.showModal()}
      ></Button>
      <Modal modalRef={modalRef}>
        <h3>Add Seller Details</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="name"
            register={register}
            errors={errors}
            placeholder="Name"
            label="Name"
          />

          <InputField
            id="address"
            register={register}
            errors={errors}
            placeholder="Address"
            label="Address"
          />
          <InputField
            id="phone"
            register={register}
            errors={errors}
            placeholder="Phone"
            label="Phone"
          />
          <InputField
            id="email"
            register={register}
            errors={errors}
            placeholder="Email"
            label="Email"
            type="email"
          />
          <div className="mt-4 flex items-center justify-center">
            <Button
              label="Create Seller"
              className="btn-primary w-full max-w-xs"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default CreateModal;

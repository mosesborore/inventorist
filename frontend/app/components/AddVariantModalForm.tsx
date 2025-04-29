"use client"; // Optional if using app dir

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { VariantSchema, AddVariantType } from "../schemas/VariantSchema";
import InputField from "./commons/InputField";
import Button from "./commons/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { buildURLWithBase } from "@/lib/utils";

interface AddVariantModalFormProps {
  modalFormRef: React.RefObject<HTMLDialogElement | null>;
  productId: number;
  productName: string;
}
export default function AddProductVariant({
  modalFormRef,
  productId,
  productName,
}: AddVariantModalFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddVariantType>({
    resolver: zodResolver(VariantSchema),
  });

  async function createVariant({
    name,
    quantity,
    price,
    bargainPrice,
    units,
  }: AddVariantType) {
    try {
      const url = buildURLWithBase(`/products/${productId}/variants`);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          price: price,
          bargain_price: bargainPrice,
          quantity: quantity,
          units: units,
        }),
      });

      if (!response.ok) {
        toast.error("Unable to create product");
      }
      modalFormRef.current?.close();
      reset();
      router.refresh(); //(`/products/${productId}`);
      toast.success("Product Variant Created Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit: SubmitHandler<AddVariantType> = async (data) => {
    await createVariant(data);
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
          <h3 className="mb-2 text-lg font-bold">
            Add Product Variant for {productName}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="name"
              register={register}
              errors={errors}
              placeholder="Name"
              label="Name"
            />
            <InputField
              id="price"
              register={register}
              errors={errors}
              placeholder="Price"
              label="Price"
              type="number"
            />
            <InputField
              id="bargainPrice"
              register={register}
              errors={errors}
              placeholder="Lowest Price"
              label="Lowest Price"
              type="number"
            />
            <InputField
              id="quantity"
              register={register}
              errors={errors}
              placeholder="Quantity"
              label="Quantity"
            />
            <InputField
              id="units"
              register={register}
              errors={errors}
              placeholder="Units"
              label="Units"
              type="number"
            />

            <div className="mt-4 flex items-center justify-center">
              <Button label="Submit" className="btn-primary w-full max-w-xs" />
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

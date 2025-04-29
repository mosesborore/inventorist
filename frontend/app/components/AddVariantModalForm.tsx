"use client"; // Optional if using app dir

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { VariantSchema, AddVariantType } from "../schemas/VariantSchema";
import InputField from "./commons/InputField";
import Button from "./commons/Button";
import { useRouter } from "next/navigation";
import { useCreateProductVariant } from "@/mutations";

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
  const createVariant = useCreateProductVariant(productId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddVariantType>({
    resolver: zodResolver(VariantSchema),
  });

  const onSubmit: SubmitHandler<AddVariantType> = async (data) => {
    await createVariant.mutateAsync(data, {
      onSuccess: () => {
        reset();
        modalFormRef.current?.close();
        router.refresh();
      },
    });
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

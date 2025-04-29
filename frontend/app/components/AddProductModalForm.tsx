"use client"; // Optional if using app dir

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProductSchema, AddProductType } from "../schemas/ProductSchema";
import InputField from "./commons/InputField";
import Button from "./commons/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api-functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddProductModalFormProps {
  modalFormRef: React.RefObject<HTMLDialogElement | null>;
}

export default function AddProduct({ modalFormRef }: AddProductModalFormProps) {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { mutateAsync: createProductMutation } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductType>({
    resolver: zodResolver(ProductSchema),
  });

  const onSubmit: SubmitHandler<AddProductType> = async (data) => {
    const response = await createProductMutation(data);

    if (!response.created) {
      toast.error("Unable to create product");
    } else {
      reset();
      modalFormRef.current?.close();

      router.push("/products");
      toast.success("Product Created Successfully");
    }
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
          <h3 className="mb-2 text-lg font-bold">Add Product</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              id="name"
              register={register}
              errors={errors}
              placeholder="Name"
              label="Name"
            />
            <InputField
              id="category"
              register={register}
              errors={errors}
              placeholder="Category"
              label="Category"
            />
            <InputField
              id="supplier"
              register={register}
              errors={errors}
              placeholder="Supplier"
              label="Supplier"
            />
            <InputField
              id="tags"
              register={register}
              errors={errors}
              placeholder="Tags"
              label="Tags"
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

//   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const formData = new FormData(e.currentTarget);
//     const name = formData.get("name");
//     console.log("Submitted Name:", name);

//     modalFormRef.current?.close();
//   };

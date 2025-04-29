"use client";
import React from "react";
import Button from "./commons/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useQueryClient, useMutation } from "@tanstack/react-query";
interface DeleteProductProps {
  productId: number;
  productName: string;
}

async function deleteProductFn(productId: number) {
  const response = await fetch(
    `http://127.0.0.1:8000/api/products/${productId}`,
    {
      method: "DELETE",
    },
  );

  return (await response.json()) as { success: boolean };
}

function DeleteProduct({ productId, productName }: DeleteProductProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutateAsync: deleteProductMutation } = useMutation({
    mutationFn: deleteProductFn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });

  const handleClick = async () => {
    const confirmDeleteion = confirm(
      `Are you sure you want to delete: ${productName}`,
    );

    if (confirmDeleteion) {
      try {
        const response = await deleteProductMutation(productId);
        if (response.success) {
          toast.success(`${productName} has been deleted successfully`);
          router.push("/products");
        } else {
          toast.error("Unable to delete the product");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Button
      label="Delete Product"
      small
      className="btn-warning mx-1"
      onClick={() => handleClick()}
    ></Button>
  );
}

export default DeleteProduct;

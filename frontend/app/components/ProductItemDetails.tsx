"use client";
import React from "react";
import ProductVariant from "./ProductVariant";
import AddVariant from "./AddVariant";
import DeleteProduct from "./DeleteProduct";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/lib/api-functions";
import Loader from "./commons/Loader";
import { useParams } from "next/navigation";

function ProductHeader({ name, tags }: { name: string; tags?: string }) {
  return (
    <header className="mb-2">
      <h2 className="mb-2 border-b-1 pb-1 font-bold">
        Details for: <span className="font-normal">{name}</span>
      </h2>
      {tags && (
        <span className="bg-accent rounded-lg p-1 text-xs font-semibold">
          {tags}
        </span>
      )}
    </header>
  );
}

function ProductItemDetails() {
  const { id: productId } = useParams();

  const fetchProduct = React.useCallback(
    () => getProduct(productId),
    [productId],
  );
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: fetchProduct,
  });
  if (!productId) {
    return (
      <div className="my-4 text-center text-red-500">Invalid product ID.</div>
    );
  }
  if (isLoading) {
    return <Loader message="Loading Product Details" />;
  }

  if (isError || !product) {
    return (
      <div className="my-4 text-center text-red-500">
        Unable to load Product
      </div>
    );
  }
  return (
    <div className="p-1">
      <ProductHeader name={product.name} tags={product.tags} />
      <div className="mt-4 flex w-full items-center gap-4 px-2 md:mx-auto md:max-w-[1200px]">
        <AddVariant productId={product.id} productName={product.name} />
        <DeleteProduct productId={product.id} productName={product.name} />
      </div>
      <ProductVariant
        productId={product.id}
        productName={product.name}
        variants={product.variants}
      />
    </div>
  );
}

export default ProductItemDetails;

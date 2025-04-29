import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProductItemDetails from "@/components/ProductItemDetails";
import { getQueryClient } from "@/get-query-client";
import { getProduct } from "@/lib/api-functions";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", id],
    queryFn: () => {
      return getProduct(id);
    },
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductItemDetails />
      </HydrationBoundary>
    </div>
  );
};

export default ProductDetailsPage;

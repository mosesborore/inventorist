import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import ProductList from "@/components/ProductList";
import AddProduct from "@/components/AddProduct";
import { getQueryClient } from "@/get-query-client";
import { getProducts } from "@/lib/api-functions";

export default async function ProductsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className="mx-auto mb-4 w-full lg:max-w-6xl">
      <AddProduct />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
}

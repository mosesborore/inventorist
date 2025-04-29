"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductType } from "../types";
import ProductItem from "./ProductItem";
import { getProducts } from "@/lib/api-functions";
import Loader from "./commons/Loader";

// interface ProductListProps {
//   products: ProductType[];
// }

export default function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <section id="productListing" className="mx-1 min-h-screen">
      <div className="join join-vertical bg-base-100 w-full">
        {isLoading ? (
          <Loader message="Loading Products" />
        ) : products && products?.length > 0 ? (
          products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })
        ) : (
          "Product Not Found"
        )}
      </div>
    </section>
  );
}

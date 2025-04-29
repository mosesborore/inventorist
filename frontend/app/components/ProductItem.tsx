import Link from "next/link";
import React from "react";
import { ProductType } from "../types";
import ProductVariant from "./ProductVariant";
import AddVariant from "./AddVariant";
import DeleteProduct from "./DeleteProduct";

interface ProductItemProps {
  product: ProductType;
}
function ProductItem({ product }: ProductItemProps) {
  return (
    <details className="collapse-arrow join-item border-base-300 collapse border">
      <summary className="collapse-title font-semibold capitalize">
        {product.name}
      </summary>
      <div className="collapse-content text-sm">
        <div className="flex items-center gap-4">
          <AddVariant productId={product.id} productName={product.name} />
          <Link href={`/products/${product.id}`}>
            <button className="btn btn-primary btn-sm">View in New Page</button>
          </Link>
          <DeleteProduct productId={product.id} productName={product.name} />
        </div>
        <ProductVariant
          variants={product.variants}
          productId={product.id}
          productName={product.name}
        />
      </div>
    </details>
  );
}

export default ProductItem;

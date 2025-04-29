import { NewProduct, ProductType } from "@/types";
import { buildURLWithBase } from "./utils";
import { ParamValue } from "next/dist/server/request/params";

export async function getProducts() {
  const url = buildURLWithBase("/products/");
  const res = await fetch(url, {
    method: "GET",
  });

  const products: ProductType[] = await res.json();

  return products;
}

export async function createProduct({
  name,
  category,
  supplier,
  tags,
}: NewProduct) {
  const url = buildURLWithBase("/products/");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, category, supplier, tags }),
  });

  return (await response.json()) as { created: boolean };
}

export async function getProduct(productId: number | ParamValue) {
  const url = buildURLWithBase(`/products/${productId}`);
  const response = await fetch(url, {
    method: "GET",
  });

  return (await response.json()) as ProductType;
}

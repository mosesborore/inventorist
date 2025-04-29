import React from "react";
import ProductSummaryList from "@/components/ProductSummaryList";

interface ProductSummaryType {
  id: string;
  name: string;
  variantsCount: number;
}

async function Summary() {
  const response = await fetch("http://127.0.0.1:8000/api/products/summary", {
    // cache: "no-store",
    next: { revalidate: 10 },
  });

  const summaries = (await response.json()) as ProductSummaryType[];
  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-5 lg:max-w-6xl">
      <span className="mx-1 my-4 text-xl font-bold opacity-60">
        Product Summary
      </span>
      <ProductSummaryList summaries={summaries} />
    </div>
  );
}

export default Summary;

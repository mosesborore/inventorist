import Link from 'next/link';
import React from 'react'


interface ProductSummaryType {
    id: string;
    name: string;
    variantsCount: number;
  }

  interface ProductSummaryListProps{
    summaries: ProductSummaryType[]
  }

  
function ProductSummaryList({summaries}: ProductSummaryListProps) {
  return (
    <div>
    <ul className="list bg-base-100 rounded-box w-full shadow-md md:max-w-[796px]">
      {/* <li className="p-4 pb-2 text-xs font-bold tracking-wide opacity-70">
        Products Summary
      </li> */}
      {summaries && summaries?.length > 0
        ? summaries?.map((summary) => {
            return (
              <li className="list-row place-items-end" key={summary.id}>
                <div>
                  <div className="capitalize">{summary.name}</div>
                  <div className="text-xs font-semibold capitalize opacity-60">
                    No. Variants: {summary.variantsCount}
                  </div>
                </div>

                <Link href={`/products/${summary.id}`}>
                  <button className="btn btn-primary btn-sm">View</button>
                </Link>
              </li>
            );
          })
        : "No Summaries"}
    </ul>
  </div>
  )
}

export default ProductSummaryList
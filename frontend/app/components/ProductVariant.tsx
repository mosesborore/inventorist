import { VariantType } from "../types";
import VariantTable from "./VariantTable";

interface ProductVariantProp {
  variants: VariantType[];
  productId: number;
  productName: string;
}

export default function ProductVariant({
  variants,
  productId,
}: ProductVariantProp) {
  return (
    <section className="mt-4 w-full px-2 md:mx-auto md:max-w-[1200px]">
      <div className="p-2 shadow-md">
        {variants.length > 0 ? (
          <VariantTable variants={variants} productId={productId} />
        ) : (
          <div className="text-center font-bold">No variants</div>
        )}
      </div>
    </section>
  );
}

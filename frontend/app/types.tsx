import { InvoiceItemSchemaType } from "./schemas/InvoiceItemSchema";
import { BuyerSchemaType, SellerSchemaType } from "./schemas/InvoiceSchema";

interface VariantType {
  id: number;
  name: string;
  price: number;
  quantity: string;
  units: number;
  bargain_price: number | null;
}

interface ProductType {
  id: number;
  name: string;
  category: string;
  supplier: string;
  tags: string;
  variants: VariantType[];
}

interface NewProduct {
  name: string;
  category: string;
  supplier: string;
  tags: string;
}

interface InvoiceType {
  date: Date;
  buyerName: string;
  buyerPhone: string;
  due_date?: string | undefined;
  total: number;
  notes: string;
  items: InvoiceItemSchemaType[];
  seller: SellerSchemaType;
  buyer: BuyerSchemaType;
}
export type { ProductType, InvoiceType, VariantType, NewProduct };

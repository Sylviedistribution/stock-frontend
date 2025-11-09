import { Product } from "./Product";

export interface PurchaseOrder {
  id?: number;
  product_id: number;
  supplier_id: number;
  quantity: number;
  order_value: number;
  order_date: string;
  expected_date: string;
  expected_delivery?: string;
  status?: string;
  product?: Product;
}




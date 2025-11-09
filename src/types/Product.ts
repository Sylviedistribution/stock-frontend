export interface Product {
  id?: number;
  name: string;
  category_id: number;
  buying_price: number;
  selling_price: number;
  quantity: number;
  threshold: number;
  expiry_date?: string;
  supplier_id: number;
  status?: string;
}

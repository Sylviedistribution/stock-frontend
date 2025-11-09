import { Product } from "../types/Product";

export interface Supplier {
  id?: number;
  name: string;
  email?: string;
  phone: string;
  address?: string;
  takes_back_returns?: boolean;
  logo?: string;
  product?: Product[];

}

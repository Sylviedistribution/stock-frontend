import axiosClient from "./axiosClient";
import { Product } from "../types/Product";

interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

const ProductsApi = {
  // 🔥 getAll prend maintenant une page (et optionnellement per_page)
  getAll: async (page = 1, per_page = 10) => {
    const { data } = await axiosClient.get<PaginatedResponse<Product>>("/products", {
      params: { page, per_page }, // ← on envoie les paramètres dans l’URL
    });
    return data;
  },
  
  get: (id: number) => axiosClient.get<Product>(`/products/${id}`),

  create: (data: Product) => axiosClient.post<Product>("/products", data),

  update: (id: number, data: Product) =>
    axiosClient.put<Product>(`/products/${id}`, data),

  remove: (id: number) => axiosClient.delete(`/products/${id}`),
};

export default ProductsApi;

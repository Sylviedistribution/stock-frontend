import axiosClient from "./axiosClient";
import { Supplier } from "../types/Supplier";

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

const suppliersApi = {
  getAll: () => axiosClient.get<{ data: Supplier[] }>("/suppliers"),
  getAll1: async (page = 1, per_page = 10) => {
    const { data } = await axiosClient.get<PaginatedResponse<Supplier>>(
      "/suppliers",
      { params: { page, per_page } }
    );
    return {
      suppliers: data.data, // 👈 tableau des commandes
      meta: data.meta,   // 👈 pagination
    };
  },
  get: (id: number) => axiosClient.get(`/suppliers/${id}`),
  create: (data: Supplier) => axiosClient.post("/suppliers", data),
  update: (id: number, data: Supplier) => axiosClient.put(`/suppliers/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/suppliers/${id}`),
};

export default suppliersApi;

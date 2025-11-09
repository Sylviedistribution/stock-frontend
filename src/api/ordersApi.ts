import axiosClient from "./axiosClient";
import { PurchaseOrder } from "../types/Order";

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

const ordersApi = {
  getAll: async (page = 1, per_page = 10) => {
    const { data } = await axiosClient.get<PaginatedResponse<PurchaseOrder>>(
      "/orders",
      { params: { page, per_page } }
    );
    return {
      orders: data.data, // 👈 tableau des commandes
      meta: data.meta,   // 👈 pagination
    };
  },
  get: (id: number) => axiosClient.get(`/orders/${id}`),
  create: (data: PurchaseOrder) => axiosClient.post("/orders", data),
  update: (id: number, data: PurchaseOrder) => axiosClient.put(`/orders/${id}`, data),
  remove: (id: number) => axiosClient.delete(`/orders/${id}`),
};

export default ordersApi;

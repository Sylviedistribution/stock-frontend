import axiosClient from "./axiosClient";
import { DashboardKPI } from "../types/Dashboard";
import { OrderSummary } from "../types/Dashboard";

const dashboardApi = {
  getSummary: async () => {
    const { data } = await axiosClient.get<DashboardKPI>("/dashboard");
    return data;
  },

  getOrderSummary: async () => {
    const { data } = await axiosClient.get<OrderSummary[]>("/stats/order_summary");
    return data;
  },

  getSalesVsPurchases: async () => {
    const { data } = await axiosClient.get<{ month: string; sales: number; purchases: number }[]>(
      "/stats/sales_vs_purchases"
    );
    return data;
  },

  getTopProducts: async () => {
    const { data } = await axiosClient.get<{ product: string; sold: number; remaining: number; price: number }[]>(
      "/stats/top-products"
    );
    return data;
  },

  getLowStock: async () => {
    const { data } = await axiosClient.get<{ id: number; name: string; quantity: number; threshold: number }[]>(
      "/stats/low-stock"
    );
    return data;
  },
};

export default dashboardApi;

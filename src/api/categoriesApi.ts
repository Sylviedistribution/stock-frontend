import axiosClient from "./axiosClient";
import { Category } from "../types/Category";


const CategoriesApi = {
  getAll: () => axiosClient.get<{ data: Category[] }>("/categories"),

  get: (id: number) => axiosClient.get<Category>(`/categories/${id}`),

  create: (data: Category) => axiosClient.post<Category>("/categories", data),

  update: (id: number, data: Category) =>
    axiosClient.put<Category>(`/categories/${id}`, data),

  remove: (id: number) => axiosClient.delete(`/categories/${id}`),
};

export default CategoriesApi;

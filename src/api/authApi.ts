// src/api/authApi.ts
import axiosClient from "./axiosClient";

interface LoginResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}
const authApi = {
  login: (email: string, password: string) => {
    return axiosClient.post<LoginResponse>("/login", { email, password });
  },

  register: (name:string, email: string, password: string) => {
    return axiosClient.post<RegisterResponse>("/register", { name, email, password });
  },

  logout: () => {
    return axiosClient.post("/logout");
  },
};

export default authApi;

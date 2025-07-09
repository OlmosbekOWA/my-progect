import axiosInstance from "../../../api";
import type { ProductQueryParams } from "../types";

export const fetchProducts = async (params: ProductQueryParams) => {
  const response = await axiosInstance.get("/api/items", { params }); // ✅ TO‘G‘RI YO‘L
  return response.data;
};

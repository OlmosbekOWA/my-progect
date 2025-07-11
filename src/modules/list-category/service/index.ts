import axiosInstance from "../../../api";
import type { ProductQueryParams} from "../types";




export const getListCategory = async (params: ProductQueryParams) => {
  const response = await axiosInstance.get("/api/items", { params });
  return response.data;
};
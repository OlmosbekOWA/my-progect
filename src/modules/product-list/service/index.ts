import axiosInstance from "../../../api";
import type { ProductQueryParams } from "../types";

export const fetchProducts = async (params: ProductQueryParams) => {
  const response = await axiosInstance.get("/api/items", { params }); 
  return response.data;
};


export const deleteItemFn = async(id:number) => {
  return await axiosInstance.delete(`api/items/${id}`)
}
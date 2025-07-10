import axiosInstance from "../../../api";
import type { Item } from "../types";
import type { AxiosResponse } from "axios";

export const getItemId = (id: number): Promise<AxiosResponse<Item>> => {
  return axiosInstance.get(`/api/items/${id}`);
};

export const updateItem = (
  id: number,
  data: FormData
): Promise<AxiosResponse<Item>> =>
  axiosInstance.put(`/api/items/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
});


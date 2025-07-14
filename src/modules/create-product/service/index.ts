import axiosInstance from "../../../api";

export const createItem = async (data: FormData) => {
  return axiosInstance.post("/api/items", data);
};

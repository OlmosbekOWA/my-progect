import axiosInstance from "../../../api";

export const getCategories = () => {
  return axiosInstance.get("/api/categories").then(res => res.data);
};

export const getCategoriesWithCount = () => {
  return axiosInstance.get("/api/categories-with-count").then(res => res.data);
};


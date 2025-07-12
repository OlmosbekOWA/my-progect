import axiosInstance from "../../../api";


export const getBrendsWithCount = () => {
  return axiosInstance.get("/api/brands-with-count").then(res => res.data);
};

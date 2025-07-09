import axiosInstance from "../../../api";


export const getItemId = (id: number) =>{
    return axiosInstance.get(`/api/items/${id}`)
}


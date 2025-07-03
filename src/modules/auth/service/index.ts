import axiosInstance from "../../../api";
import type { LoginInput, LoginResponse } from "../types";
export const loginRequest = async (input: LoginInput): Promise<LoginResponse> => {
  const res = await axiosInstance.post("/api/login", input);
  return res.data;
};


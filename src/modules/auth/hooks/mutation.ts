import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../service";
import type { LoginInput, LoginResponse } from "../types";
import { toast } from "react-toastify";
import { setItemToken } from "../../../utils/token-serviace";

export const useLogin = (
  onSuccess?: (data: LoginResponse) => void,
  onError?: (error: any) => void
) => {
  return useMutation<LoginResponse, any, LoginInput>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      setItemToken("token", data.token)
      
      toast.success("Muvaffaqiyatli kirdingiz!");
      if (onSuccess) onSuccess(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login muvaffaqiyatsiz bo'ldi");
      if (onError) onError(error);
    },
  });
};

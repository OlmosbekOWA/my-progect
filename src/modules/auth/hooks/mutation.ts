// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../service";
import type { LoginInput, LoginResponse } from "../types";

export const useLogin = (onSuccess?: (data: LoginResponse) => void) => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token); 
      onSuccess?.(data); 
    },
  });
};

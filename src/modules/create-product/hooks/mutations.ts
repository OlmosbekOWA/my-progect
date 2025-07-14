import { useMutation } from "@tanstack/react-query";
import { createItem } from "../service";

export const useCreateItems = () => {
  return useMutation({
    mutationFn: createItem,
  });
};

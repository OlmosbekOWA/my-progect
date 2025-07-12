import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "../service";
import type { Item } from "../types";
import type { AxiosResponse } from "axios";

export const useUpdateItem = () => {
  const qc = useQueryClient();

  return useMutation<
    AxiosResponse<Item>,
    unknown,
    { id: number; data: FormData }
  >({
    mutationFn: ({ id, data }) => updateItem(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["items"] });
      qc.invalidateQueries({ queryKey: ["item"] });
    },
    onError: (err) => {
      console.error("Xatolik:", err);
    }
  });
};

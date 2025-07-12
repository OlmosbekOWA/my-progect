import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteItemFn } from "../service";


export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteItemFn,
    onSuccess: () => {
      toast.success("Mahsulot o‘chirildi");
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError: () => {
      toast.error("O‘chirishda xatolik yuz berdi");
    },
  });
};
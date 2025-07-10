import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../service";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories
  });
};

import { getCategoriesWithCount } from "../service";

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: ["categories-with-count"],
    queryFn: getCategoriesWithCount,
  });
};
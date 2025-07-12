import { useQuery } from "@tanstack/react-query";

import { getCategoriesWithCount } from "../service";

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: ["categories-with-count"],
    queryFn: getCategoriesWithCount,
  });
};
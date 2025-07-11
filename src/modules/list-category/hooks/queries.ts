import { useQuery } from "@tanstack/react-query";

import { getListCategory } from "../service";

import type { ProductResponse } from "../types";
import type { ProductQueryParams } from "../types"

export const useListCategory = (params: ProductQueryParams) => {
  return useQuery<ProductResponse>({
  queryKey: ["products", params],
  queryFn: () => getListCategory(params), // endi to‘g‘ri
});

};
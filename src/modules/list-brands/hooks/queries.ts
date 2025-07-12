import { useQuery } from "@tanstack/react-query";

import { getListBrands } from "../service";

import type { ProductResponse } from "../types";
import type { ProductQueryParams } from "../types"

export const useListBrands = (params: ProductQueryParams) => {
  return useQuery<ProductResponse>({
    queryKey: ["products", params],
    queryFn: () => getListBrands(params), 
  });

};
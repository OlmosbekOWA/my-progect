import { useQuery } from "@tanstack/react-query";

import { fetchProducts } from "../service"

import type { ProductResponse } from "../types";
import type { ProductQueryParams } from "../types"

export const useProducts = (params: ProductQueryParams) => {
  return useQuery<ProductResponse>({
    queryKey: ["products", params], 
    queryFn: () => fetchProducts(params),
  });
};

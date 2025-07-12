import { useQuery } from "@tanstack/react-query";
import { getBrendsWithCount } from "../service";

export const useBrendsWithCount = () => {
  return useQuery({
    queryKey: ["categories-brends-count"],
    queryFn: getBrendsWithCount,
  });
};
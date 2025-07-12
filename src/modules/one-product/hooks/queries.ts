import { getItemId } from "../service";
import { useQuery } from "@tanstack/react-query";


export const getItemFunc = (id:number) =>{
    return useQuery({
        queryKey: ["item", id],
        queryFn: () => getItemId(id),
        enabled: !!id,
    })
}
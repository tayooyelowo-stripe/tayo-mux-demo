import type { ProductResponse } from "@/types/Product";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useProducts = () => {
    return useInfiniteQuery<ProductResponse>({
        queryKey: ['products'],
        queryFn: async ({ pageParam }: { pageParam: any }) => {
            const startingAfter = pageParam ? pageParam.id : undefined;
            const url = new URL('http://localhost:3000/api/products');

            if(pageParam) {
                url.searchParams.set('startingAfter', startingAfter);
            }

            console.log(url)

            const res = await fetch(url.toString());
            return res.json();
        },
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.lastProductId : undefined,
    });
}
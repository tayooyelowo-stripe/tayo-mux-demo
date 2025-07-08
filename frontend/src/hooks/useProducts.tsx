import type { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
    const { isPending, error, data } = useQuery<Product[]>({
        queryKey: ['products'],
        initialData: [],
        queryFn: () =>
            fetch('http://localhost:3000/api/products').then((res) =>
                res.json(),
            ),
    });

    return {
        data,
        isPending,
        error,
    };
}
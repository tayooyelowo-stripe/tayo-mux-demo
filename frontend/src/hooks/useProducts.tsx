import type { Product } from "@/types/Product";
import { useEffect, useState } from "react";

const DEFAULT_CARD = {
    id: 0,
    img: {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        alt: "Green double couch with wooden legs"
    },
    title: 'Living room Sofa',
    description: 'This sofa is perfect for modern tropical spaces, baroque inspired spaces.',
    price: 4500,
};

export const useProducts = () => {
    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            try {
                const mockProducts: Product[] = Array.from({ length: 15 }, (_, i) => ({
                    ...DEFAULT_CARD,
                    id: i + 1
                }));
                setData(mockProducts);
            } catch (err) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return {
        data,
        isLoading,
        isError,
    };
}
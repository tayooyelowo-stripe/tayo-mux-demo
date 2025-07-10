export interface Product {
    description: string;
    id: number;
    image: string;
    name: string;
    price: number;
    priceId: string;
}

export interface ProductResponse {
    products: Product[],
    hasMore: boolean,
    lastProductId?: string,
}
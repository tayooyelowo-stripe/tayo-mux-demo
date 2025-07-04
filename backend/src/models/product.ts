export interface Product {
    id: number;
    img: {
        src: string;
        alt: string;
    };
    title: string;
    description: string;
    price: number;
    priceId: string;
}

const DEFAULT_PRODUCT: Product = {
    id: 0,
    img: {
        src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        alt: "Green double couch with wooden legs"
    },
    title: 'Living room Sofa',
    description: 'This sofa is perfect for modern tropical spaces, baroque inspired spaces.',
    price: 4500,
    priceId: 'price_1RgtqkGbaBCXbyosxI9PAVPe',
};

export let products: Product[] = Array.from({ length: 15 }, (_, i) => ({
    ...DEFAULT_PRODUCT,
    id: i + 1
}));
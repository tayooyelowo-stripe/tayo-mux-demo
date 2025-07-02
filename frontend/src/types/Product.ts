export interface Product {
    id: number;
    img: {
        src: string;
        alt: string;
    };
    title: string;
    description: string;
    price: number;
}
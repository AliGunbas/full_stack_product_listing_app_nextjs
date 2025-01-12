export interface Product {
    filtered: boolean;
    product: {
        name: string;
        popularityScore: number;
        weight: number;
        images: {
            yellow: string;
            rose: string;
            white: string;
        };
        price: number;
    }
}
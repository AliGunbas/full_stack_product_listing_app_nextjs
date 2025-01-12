import axios from "axios";
import products from "../../../data/products"



export const filterProducts = async (filters: { [key: string]: any }) => {
    const { name, popularityMin, popularityMax, priceMin, priceMax } = filters;

    // const CGP = await getCurrentGoldPrice();
    const CGP = 2689;

    const productsMap = await Promise.all(
        products.map(async (product) => {
            const productPrice = (Number(product.popularityScore) + 1) * Number(product.weight) * CGP;
            console.log("product price:", productPrice)
            const matchesName = name
                ? product.name.toLowerCase().includes(name.toLowerCase())
                : true;

            const matchesPopularity =
                (popularityMin && popularityMin != 0 ? (product.popularityScore * 5) >= popularityMin : true) &&
                (popularityMax && popularityMax != 0 ? (product.popularityScore * 5) <= popularityMax : true);

            const matchesPrice =
                (priceMin && priceMin != 0 ? productPrice >= priceMin : true) &&
                (priceMax && priceMax != 0 ? productPrice <= priceMax : true);


            return { filtered: matchesName && matchesPopularity && matchesPrice, product: { ...product, price: productPrice } };
        })
    );

    const filteredProducts = productsMap.filter((item) => item.filtered)
    return filteredProducts;
};

const getCurrentGoldPrice = async () => {

    const config = {
        baseURL: 'https://www.goldapi.io/api/',
        headers: {
            'x-access-token': 'goldapi-ej5esm5s49613-io',
            'Content-Type': 'application/json',
        },
    };


    try {
        let response = await axios.get('XAU/USD', config)
        let data = response.data
        let currentPrice = data.price
        return currentPrice
    }
    catch (err:any) {
        console.error(
            'Error fetching gold price:',
            err.response ? err.response.data : err.message
        )
        throw { error: err, message: "GET Current Gold Price Error" }
    }
}

export function formatNumber(value: number) {
    if (isNaN(value)) return "Invalid number";

    const [integerPart, decimalPart] = value.toString().split(".");

    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedDecimal = decimalPart
        ? parseFloat(`0.${decimalPart}`).toFixed(2).split(".")[1]
        : "00";

    return `${formattedInteger}.${formattedDecimal}`;
}
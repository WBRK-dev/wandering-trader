import { CryptoData } from "../types/cryptoData.js";

export default async function (): Promise<CryptoData> {
    const response = await fetch('https://api.coinbase.com/api/v3/brokerage/market/products/ETH-EUR', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    });
    if (!response.ok)
        throw new Error('Failed to get a correct response from the API');

    const data = await response.json();
    return data;
}
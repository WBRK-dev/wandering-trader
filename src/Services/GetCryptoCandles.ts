import Print from "../Kernel/Support/Facades/Print.js";
import { CryptoCandles } from "../types/cryptoData.js";

export default async function (): Promise<CryptoCandles> {
    const startTime = Math.floor(Date.now() / 1000) - 3600 * 48;
    const endTime = Math.floor(Date.now() / 1000);

    const response = await fetch(`https://api.coinbase.com/api/v3/brokerage/market/products/ETH-EUR/candles?start=${startTime}&end=${endTime}&granularity=FIFTEEN_MINUTE`, {
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
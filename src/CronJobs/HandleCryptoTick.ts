import knex from "knex";
import Print from "../Kernel/Support/Facades/Print.js";
import GetCryptoCandles from "../Services/GetCryptoCandles.js";
import GetCryptoData from "../Services/GetCryptoData.js";
import { Order } from "../types/models/orders.js";
import Db from "../Kernel/Support/Facades/Db.js";

export default async function () {
    Print.info("Fetching data from API...");
    const response = await GetCryptoData();
    const candles = await GetCryptoCandles();

    const price = Number(response.price);
    const lowestPrice = Number(candles.candles.reduce((min, candle) => Number(min.low) > Number(candle.low) ? candle : min).low);
    const highestPrice = Number(candles.candles.reduce((max, candle) => Number(max.high) < Number(candle.high) ? candle : max).high);
    const averagePrice = lowestPrice + (highestPrice - lowestPrice) / 2;

    Print.info(`Current price: ${response.price}`);
    Print.info(`Lowest price: ${lowestPrice}`);
    Print.info(`Highest price: ${highestPrice}`);
    Print.info(`Average price: ${averagePrice.toFixed(2)}`);

    let orders = await Db('orders').select('*').where({ active: 1 }) as Order[];

    orders.forEach(async order => {
        const originalPrice = order.price / order.amount * 1;
        const percentageChange = ((price - originalPrice) / originalPrice) * 100;
        Print.info(`Order ID: ${order.id}, Amount: ${order.amount}, Price: ${order.price}, Original Price: ${originalPrice.toFixed(2)}, Percentage Change: ${percentageChange.toFixed(2)}%`);

        if (originalPrice * 1.02 < price) {
            Print.info(`Order ID: ${order.id}, Current price is above the order price, selling...`);

            await Db('orders').where({ id: order.id }).update({ active: 0 });
            await Db('return_orders').insert({
                order_id: order.id,
                price: price / 1 * order.amount,
            });
        }
    });

    orders = await Db('orders').select('*').where({ active: 1 }) as Order[];

    Print.debug(`${averagePrice * 0.98} ${price}`);
    if (averagePrice * 0.98 > price) {
        Print.info("Price is below average... Buying!");

        const totalPriceInOrders = orders.reduce((total, order) => total + order.price, 0);
        if (totalPriceInOrders >= 20) {
            Print.info("Total price in orders is 20 or above, not buying.");
            return;
        }

        for (const order of orders) {
            const originalPrice = order.price / order.amount * 1;
            if (originalPrice * 0.98 < price && originalPrice * 1.02 > price) {
                Print.info(`Price is in range of order ${order.id}, not buying.`);
                return;
            }
        }

        await Db('orders').insert({
            product: 'ETH-EUR',
            amount: 1 / price * 1,
            price: 1,
        });

        return;
    }

    Print.info("Price is above average... Doing nothing.");
}
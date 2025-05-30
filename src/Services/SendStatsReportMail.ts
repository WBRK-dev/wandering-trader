import Db from "../Kernel/Support/Facades/Db.js";
import Print from "../Kernel/Support/Facades/Print.js";
import { Order } from "../types/models/orders.js";
import { Order as StatsMailOrder } from "../types/mail/statsMail.js";
import GetCryptoData from "./GetCryptoData.js";
import StatsMail from "../Mail/StatsMail.js";

export default async function (startTime: number, customSubject?: string): Promise<void> {
    const cryptoData = await GetCryptoData();

    const mailOrders: StatsMailOrder[] = [];
    const orders = await Db('orders').select('*')
        .where({ active: 1 }) as Order[];

    for (const order of orders) {
        const originalPrice = order.price / order.amount * 1;
        const percentageChange = ((Number(cryptoData.price) - originalPrice) / originalPrice) * 100;
        mailOrders.push({
            amount: order.amount,
            product: order.product.split('-')[0],
            startPrice: order.price,
            price: Number(cryptoData.price) / 1 * order.amount,
            percentage: Number(percentageChange.toFixed(2)),
        });
    }

    const returnMailOrders: StatsMailOrder[] = [];
    const returnOrders = await Db('return_orders')
        .join('orders', 'return_orders.order_id', '=', 'orders.id')
        .select('orders.*', 'return_orders.price as return_price')
        .where('return_orders.created_at', '>=', startTime) as (Order & { return_price: number })[];

    for (const order of returnOrders) {
        returnMailOrders.push({
            amount: order.amount,
            product: order.product.split('-')[0],
            startPrice: order.price,
            price: order.return_price,
            percentage: (((order.return_price / order.amount) - (order.price / order.amount)) / (order.price / order.amount)) * 100,
        });
    }

    const mail = new StatsMail(
        returnMailOrders.reduce((acc, order) => acc + (order.price - order.startPrice), 0).toFixed(2),
        returnMailOrders.length,
        mailOrders,
        returnMailOrders,
    );
    mail.subject = customSubject || `Stats Report - ${new Date().toLocaleDateString('nl-NL')}`;
    await mail.send(process.env.REPORT_EMAIL!);
}
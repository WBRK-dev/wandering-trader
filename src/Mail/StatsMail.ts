import path from "path";
import Mail from "../Kernel/Classes/Mail.js";
import { Order } from "../types/mail/statsMail.js";

export default class StatsMail extends Mail {
    subject: string = "Weekly Report";
    view: string = path.resolve('src/Mail/StatsMail.html');

    constructor(
        private readonly returnOrderProfit: string,
        private readonly returnOrderCount: number,
        private readonly orders: Order[],
        private readonly returnOrders: Order[],
    ) { super(); }
}
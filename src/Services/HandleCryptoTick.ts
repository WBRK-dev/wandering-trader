import Print from "../Kernel/Support/Facades/Print.js";
import GetCryptoData from "./GetCryptoData.js";

export default async function () {
    Print.info("Fetching data from API...");
    const response = await GetCryptoData();

    Print.debug(response);
    Print.info(`Current price: ${response.price}`);
}
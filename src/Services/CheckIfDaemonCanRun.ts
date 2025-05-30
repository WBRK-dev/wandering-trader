import NotLoggedInError from "../Kernel/Classes/Errors/NotLoggedInError.js";
import Print from "../Kernel/Support/Facades/Print.js";

export default async function () {
    Print.warn("You are not logged in.");
    Print.info("Use the 'login' command to log in first.");
    Print.info("Waiting for 120 seconds before exiting...");
    // await new Promise(resolve => setTimeout(resolve, 120000));
    // throw new NotLoggedInError();
}
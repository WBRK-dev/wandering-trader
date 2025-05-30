import { spawn } from "node:child_process";
import NotLoggedInError from "../Kernel/Classes/Errors/NotLoggedInError.js";
import Db from "../Kernel/Support/Facades/Db.js";
import Print from "../Kernel/Support/Facades/Print.js";
import fs from "node:fs";
import path from "node:path";

export default async function () {
    Print.warn("You are not logged in.");
    Print.info("Use the 'login' command to log in first.");
    Print.info("Waiting for 120 seconds before exiting...");
    // await new Promise(resolve => setTimeout(resolve, 120000));
    // throw new NotLoggedInError();

    if (!fs.existsSync(path.resolve(Db().client.config.connection.filename))) {
        Print.info("Database file not found. Creating a new database...");
        const child = spawn("node", ["build/", "db", "migrate"], { stdio: "inherit" });
        await new Promise(r => child.on("exit", r));
    }
}
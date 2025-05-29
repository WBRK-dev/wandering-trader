import commandResolver from "./CommandResolver.js";
import Log from "./Support/Facades/Log.js";

export default async function (argv: string[]) {
    try {
        await commandResolver(argv);
    } catch (error: any) {
        console.log(`\x1b[1;41m ${error.name}\x1b[0;41m ${error.message} \x1b[0;49m`);
        console.log(error.stack.split("\n").slice(1).join("\n"));
        await Log('error.log').error(`${error.stack || error.message || error}`);
    }
}
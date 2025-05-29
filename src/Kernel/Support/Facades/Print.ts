export default {
    info,
    warn,
    error,
    debug,
}

function info(message: string): void {
    console.log(`\x1b[1;44m INFO \x1b[0;49m ${message}`);
}

function warn(message: string): void {
    console.warn(`\x1b[1;43m WARN \x1b[0;49m ${message}`);
}

function error(message: string): void {
    console.error(`\x1b[1;41m ERROR \x1b[0;49m ${message}`);
}

function debug(message: any): void {
    if (typeof message === "object")
        message = JSON.stringify(message, null, 2);
    else if (typeof message !== "string")
        message = String(message);

    console.debug(`\x1b[1;42m DEBUG \x1b[0;49m ${message}`);
}
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";

export default class {
    constructor(
        private readonly _file: string,
    ) { }

    private async write(message: string): Promise<void> {
        if (!existsSync(`storage/${this._file}`))
            await writeFile(`storage/${this._file}`, "", { flag: "wx" });

        await writeFile(`storage/${this._file}`, `${this.getDate()} ${message}\n`, { flag: "a" });
    }

    private getDate(): string {
        const date = new Date();
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
    }

    async info(message: string): Promise<void> {
        await this.write(`INFO: ${message}`);
    }

    async warn(message: string): Promise<void> {
        await this.write(`WARN: ${message}`);
    }

    async error(message: string): Promise<void> {
        await this.write(`ERROR: ${message}`);
    }

    async debug(message: string): Promise<void> {
        await this.write(`DEBUG: ${message}`);
    }
}
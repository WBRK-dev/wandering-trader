import Command from "../Kernel/Interfaces/Command.js";
import Print from "../Kernel/Support/Facades/Print.js";
import { CronJob } from 'cron';
import HandleCryptoTick from "../Services/HandleCryptoTick.js";

export default class LoginCommand implements Command {
    description = "Run the daemon process";
    signature = "daemon";

    async handle(args: Record<string, any>) {
        Print.info("Daemon started");

        new CronJob(
            '* 0 * * * *',
            HandleCryptoTick,
            null,
            true,
            'Europe/Amsterdam',
        );
    }
}
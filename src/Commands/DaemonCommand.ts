import Command from "../Kernel/Interfaces/Command.js";
import Print from "../Kernel/Support/Facades/Print.js";
import { CronJob } from 'cron';
import HandleCryptoTick from "../CronJobs/HandleCryptoTick.js";
import CheckIfDaemonCanRun from "../Services/CheckIfDaemonCanRun.js";
import StatsMail from "../Mail/StatsMail.js";
import WeeklyReport from "../CronJobs/WeeklyReport.js";

export default class LoginCommand implements Command {
    description = "Run the daemon process";
    signature = "daemon";

    async handle(args: Record<string, any>) {
        await CheckIfDaemonCanRun();

        // new CronJob(
        //     '0 0 * * * *',
        //     HandleCryptoTick,
        //     null,
        //     true,
        //     'Europe/Amsterdam',
        // );
        await HandleCryptoTick();
        await WeeklyReport();

        Print.info("Daemon started");
    }
}
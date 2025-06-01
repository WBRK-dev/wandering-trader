import Command from "../Kernel/Interfaces/Command.js";
import Print from "../Kernel/Support/Facades/Print.js";
import { CronJob } from 'cron';
import HandleCryptoTick from "../CronJobs/HandleCryptoTick.js";
import CheckIfDaemonCanRun from "../Services/CheckIfDaemonCanRun.js";
import WeeklyReport from "../CronJobs/WeeklyReport.js";
import DailyReport from "../CronJobs/DailyReport.js";

export default class LoginCommand implements Command {
    description = "Run the daemon process";
    signature = "daemon";

    async handle(args: Record<string, any>) {
        await CheckIfDaemonCanRun();

        new CronJob(
            '0 0 * * * *',
            HandleCryptoTick,
            null,
            true,
            'Europe/Amsterdam',
        );
        new CronJob(
            '0 1 9 * * 6',
            WeeklyReport,
            null,
            true,
            'Europe/Amsterdam',
        );
        new CronJob(
            '0 1 19 * * *',
            DailyReport,
            null,
            true,
            'Europe/Amsterdam',
        );

        Print.info("Daemon started");
    }
}
import DailyReport from "../CronJobs/DailyReport.js";
import WeeklyReport from "../CronJobs/WeeklyReport.js";
import Command from "../Kernel/Interfaces/Command.js";
import Print from "../Kernel/Support/Facades/Print.js";

export default class LoginCommand implements Command {
    description = "Send a stats report";
    signature = "stats-report";

    async handle(args: Record<string, any>) {
        if (!['weekly', 'daily'].includes(args[0]))
            return Print.error("Invalid argument. Use 'weekly' or 'daily'.");

        if (args[0] === 'weekly') 
            await WeeklyReport();
        else
            await DailyReport();

        process.exit(0);
    }
}
import Command from "../Kernel/Interfaces/Command.js";

export default class LoginCommand implements Command {
    description = "Run the database migration handler";
    signature = "db:migrate";

    async handle(args: Record<string, any>) {
        if (args[0] === "create") {
            
        }
    }
}
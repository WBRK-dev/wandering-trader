import Command from "../Kernel/Interfaces/Command.js";

export default class LoginCommand implements Command {
    description = "Login to the application";
    signature = "login";

    async handle(args: Record<string, any>) {
        throw new Error("LoginCommand is not implemented yet.");
    }
}
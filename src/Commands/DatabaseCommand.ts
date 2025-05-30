import knex from "knex";
import Command from "../Kernel/Interfaces/Command.js";
import Db from "../Kernel/Support/Facades/Db.js";
import Print from "../Kernel/Support/Facades/Print.js";

export default class LoginCommand implements Command {
    description = "Run the database handler";
    signature = "db";

    async handle(args: Record<string, any>) {
        if (args[0] === "migrate") {
            const [ count, migrations ] = await Db().migrate.latest();
            Print.info(`Migration index: ${count}`);
            migrations.forEach((migration: string) => Print.info(`Migration: ${migration}`));
            process.exit(0);
        } else if (args[0] === "rollback") {
            const [ count, migrations ] = await Db().migrate.rollback();
            Print.info(`Migration index: ${count}`);
            migrations.forEach((migration: string) => Print.info(`Migration: ${migration}`));
            process.exit(0);
        } else if (args[0] === "down") {
            const [ count, migrations ] = await Db().migrate.down();
            Print.info(`Migration index: ${count}`);
            migrations.forEach((migration: string) => Print.info(`Migration: ${migration}`));
            process.exit(0);
        }

        Print.error("Invalid command. Use 'migrate', 'rollback', or 'down'.");
    }
}
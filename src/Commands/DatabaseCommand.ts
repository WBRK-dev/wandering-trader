import Command from "../Kernel/Interfaces/Command.js";
import Db from "../Kernel/Support/Facades/Db.js";
import Print from "../Kernel/Support/Facades/Print.js";
import path from "node:path";
import fs from "node:fs/promises";

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
            const dbLocation = path.resolve(Db().client.config.connection.filename);

            try {
                await fs.access(dbLocation);
                await fs.rm(dbLocation);
            } catch {
                Print.error(`Database file does not exist at: ${dbLocation}`);
                return;
            }
            Print.info(`Removed database file at: ${dbLocation}`);
            return;
        } else if (args[0] === "create" && args[1]) {
            const migrationLocation = await Db().migrate.make(args[1]);
            Print.info('Migration created at:');
            Print.info(migrationLocation);
            process.exit(0);
        }

        Print.error("Invalid command. Use 'migrate', 'rollback', 'down' or 'create'.");
    }
}
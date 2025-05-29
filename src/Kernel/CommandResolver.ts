import fs from 'node:fs/promises';
import path from 'path';
import Command from './Interfaces/Command.js';

export default async function (argv: string[]): Promise<boolean> {
    const commandsDir = path.resolve(import.meta.dirname, '../Commands');
    const files = await fs.readdir(commandsDir);

    const commands: Record<string, Command> = {};

    for (const file of files) {
        if (file.endsWith('.ts') || file.endsWith('.js')) {
            const filePath = path.join(commandsDir, file);
            const module = await import(filePath);
            const CommandClass = module.default;
            if (CommandClass) {
                const instance = new CommandClass() as Command;
                commands[instance.signature] = instance;
            }
        }
    }

    if (argv.length === 0 || argv.includes('--help') || argv.includes('-h') || !commands[argv[0]]) {
        return displayHelp(commands);
    }

    await commands[argv[0]].handle(argv.slice(1));

    return true;
}

function displayHelp(commands: Record<string, Command>): boolean {
    const keys = Object.keys(commands);
    for (const key of keys) {
        console.log(`${key}\x1b[0;90m  ${commands[key].description}\x1b[0;39m`);
    }
    return true;
}
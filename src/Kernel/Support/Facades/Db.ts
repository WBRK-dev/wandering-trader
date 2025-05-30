import knex from "knex";

export default function Db(table?: string) {
    const knexV: any = knex({
        client: 'sqlite3',
        connection: {
            filename: './storage/db.sqlite'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './database/migrations'
        }
    });
    return table ? knexV(table) : knexV;
}
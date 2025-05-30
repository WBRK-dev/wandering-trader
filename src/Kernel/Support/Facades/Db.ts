import knex from "knex";

export default function Db(table: string) {
    return knex({
        client: 'sqlite3',
        connection: {
            filename: './storage/db.sqlite'
        },
        useNullAsDefault: true,
        migrations: {
            directory: './database/migrations'
        }
    })(table);
}
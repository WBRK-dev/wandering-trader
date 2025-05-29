export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './storage/db.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    }
  }
};

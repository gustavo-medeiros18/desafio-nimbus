require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/get-damage-summary-by-date/database/migrations",
    },
    seeds: {
      directory: "./src/get-damage-summary-by-date/database/seeds",
    },
  },
  test: {
    client: "sqlite3",
    connection: {
      filename: "./src/get-damage-summary-by-date/database/test.sqlite",
    },
    seeds: {
      directory: "./src/get-damage-summary-by-date/database/seeds",
    },
    useNullAsDefault: true,
    onAfterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done);
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./src/get-damage-summary-by-date/database/migrations",
    },
    pool: {
      min: 2,
      max: 100,
    },
  },
};

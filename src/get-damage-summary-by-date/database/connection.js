const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  getConnection: function () {
    const connection = new Pool({
      host: process.env.POSTGRESQL_HOST,
      user: process.env.POSTGRESQL_USER,
      password: process.env.POSTGRESQL_PASSWORD,
      database: process.env.POSTGRESQL_DATABASE,
      port: process.env.POSTGRESQL_PORT,
    });

    connection.connect((error, _client, release) => {
      if (error) throw new Error("Error connecting to PostgreSQL database", error);

      release();
    });

    return connection;
  },
};

const { Client } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  getConnection: function () {
    const client = new Client({
      host: process.env.POSTGRES_HOST,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: process.env.POSTGRES_PORT,
    });

    client.connect((error) => {
      if (error) throw new Error("Error connecting to PostgreSQL database", error);
    });

    return client;
  },
};

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  execute: async function () {
    const connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    });

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL database:", err);
        return;
      }
      console.log("Connected to MySQL database");
    });

    connection.query("SELECT * FROM alerts", (err, results, fields) => {
      if (err) {
        console.error("Error querying MySQL database:", err);
        return;
      }
      console.log("Results from MySQL database:", results);
    });

    connection.end((err) => {
      if (err) {
        console.error("Error disconnecting from MySQL database:", err);
        return;
      }
      console.log("Disconnected from MySQL database");
    });
  },
};

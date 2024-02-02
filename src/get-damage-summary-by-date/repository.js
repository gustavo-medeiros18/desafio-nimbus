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

    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM alerts", (err, results) => {
        if (err) {
          console.error("Error querying MySQL database:", err);

          reject(err);
          return;
        }

        resolve(results);
      });
    });
  },
};

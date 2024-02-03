const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  execute: async function (dateStart, dateEnd) {
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
      const sqlStatement = "SELECT * FROM alerts WHERE date BETWEEN ? AND ?";

      connection.query(sqlStatement, [dateStart, dateEnd], (err, results) => {
        if (err) {
          console.error("Error querying MySQL database:", err);

          reject(err);

          connection.end();
          return;
        }

        connection.end();
        resolve(results);
      });
    });
  },
};

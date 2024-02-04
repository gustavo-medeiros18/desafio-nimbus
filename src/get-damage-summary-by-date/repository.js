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

    connection.connect((error) => {
      if (error) throw new Error("Error connecting to MySQL database:", error);
    });

    return new Promise((resolve, reject) => {
      const sqlStatement = "SELECT * FROM alerts WHERE date BETWEEN ? AND ?";

      connection.query(sqlStatement, [dateStart, dateEnd], (error, results) => {
        if (error) reject(error);

        connection.end();
        resolve(results);
      });
    });
  },
};

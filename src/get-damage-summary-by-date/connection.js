const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  getConnection: function () {
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

    return connection;
  },
};

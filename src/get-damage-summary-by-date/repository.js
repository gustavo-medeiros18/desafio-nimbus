const { getConnection } = require("./connection");

module.exports = {
  execute: async function (dateStart, dateEnd) {
    const database = getConnection();

    return new Promise((resolve, reject) => {
      const sqlStatement = "SELECT * FROM alerts WHERE date BETWEEN ? AND ?";

      database.query(sqlStatement, [dateStart, dateEnd], (error, results) => {
        if (error) reject(error);

        database.end();
        resolve(results);
      });
    });
  },
};

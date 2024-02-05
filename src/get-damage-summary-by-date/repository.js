const { Query } = require("pg");
const { getConnection } = require("./database/connection");

module.exports = {
  getAlertsBetweenDates: async function (startDate, endDate) {
    const client = getConnection();

    try {
      const result = await client("alerts").whereBetween("date", [startDate, endDate]);

      return result;
    } catch (error) {
      throw new Error("Error executing query:", error);
    } finally {
      await client.destroy();
    }
  },
};

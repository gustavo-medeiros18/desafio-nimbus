const { Query } = require("pg");
const { getConnection } = require("./database/connection");

module.exports = {
  getAlertsBetweenDates: async function (startDate, endDate) {
    const client = getConnection();

    try {
      const query = {
        text: `
          SELECT *
          FROM public.alerts
          WHERE "date" BETWEEN $1 AND $2
        `,
        values: [startDate, endDate],
      };

      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      throw new Error("Error executing query:", error);
    } finally {
      await client.end();
    }
  },
};

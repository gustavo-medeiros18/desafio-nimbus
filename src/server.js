const express = require("express");

const getDamageSummaryByDateRoute = require("./get-damage-summary-by-date/route");

const server = express();

server.get(getDamageSummaryByDateRoute.path, async (req, res) => {
  const dateStart = req.query.dateStart;
  const dateEnd = req.query.dateEnd;

  const results = await getDamageSummaryByDateRoute.fn(dateStart, dateEnd);

  res.status(200).json(results);
});

module.exports = server;

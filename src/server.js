const express = require("express");

const getDamageSummaryByDateRoute = require("./get-damage-summary-by-date/route");

const server = express();

server.get(getDamageSummaryByDateRoute.path, async (req, res) => {
  await getDamageSummaryByDateRoute.fn(req, res);
});

module.exports = server;

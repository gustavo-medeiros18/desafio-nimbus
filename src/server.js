const express = require("express");

const getDamageSummaryByDateRoute = require("./get-damage-summary-by-date/route");

const server = express();

server.get("/", async (req, res) => {
  res.status(200).json(await getDamageSummaryByDateRoute.fn());
});

module.exports = server;

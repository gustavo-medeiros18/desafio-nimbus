const endpoint = require("./endpoint");

module.exports = {
  path: "/damage-summary-by-date",
  fn: endpoint.execute,
};

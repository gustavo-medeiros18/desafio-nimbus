require("dotenv").config();

const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

module.exports = {
  getConnection: function () {
    const client = knex;

    return client;
  },
};

require("dotenv").config();

const dbConfig = require("../../../knexfile");
const environment = process.env.NODE_ENV || "development";
const knex = require("knex")(dbConfig[environment]);

const file = require("./seeds/cadastro_alertas");

module.exports = async function runSeeds() {
  try {
    await knex.seed.run({
      specific: "./seeds/cadastro_alertas.js",
    });
  } catch (error) {
    throw new Error(`Error running seeds: ${error.message}`);
  }
};

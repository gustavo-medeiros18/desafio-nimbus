const { execSync } = require("child_process");
const runSeeds = require("./src/get-damage-summary-by-date/database/run-seeds");
const { getConnection } = require("./src/get-damage-summary-by-date/database/connection");

beforeAll(async () => {
  process.env.NODE_ENV = "test";

  const client = getConnection();

  await client.migrate.latest();
  await client.seed.run();
});

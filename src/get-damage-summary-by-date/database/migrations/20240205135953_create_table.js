/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return await knex.schema.createTable("alerts", (table) => {
    table.increments("id").primary();
    table.date("date").notNullable();
    table.string("event").notNullable();
    table.integer("damage").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("alerts");
};

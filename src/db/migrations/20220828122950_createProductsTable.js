/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("products", (table) => {
        table.increments("product_id").primary(); // Sets `product_id` as the primary key
        table.string("product_sku");
        table.string("product_name");
        table.text("product_description");
        table.integer("product_quantity_in_stock");
        table.decimal("product_weight_in_lbs");
        table.integer("supplier_id").unsigned().notNullable();   //prevent neg # from being inserted into supplier id and chaining notNullable
        table
          .foreign("supplier_id")
          .references("supplier_id")
          .inTable("suppliers")
          .onDelete("cascade"); //if supplier is deleted, all related products deleted as well
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("products");
};

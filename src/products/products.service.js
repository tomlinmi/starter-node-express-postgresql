const knex = require("../db/connection");

//below is to configure the properties for the joined table "categories" to be nested object and used by read
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
category_id: "category.category_id",
category_name: "category.category_name",
category_description: "category.category_description",
});

//begin queries for the product service

function list() {
  return knex("products").select("*");
}

/*basic read productId before joining read with categories in query builder below
function read(productId) {
  return knex("products").select("*").where({ product_id: productId }).first();
}
*/

function read(product_id) {
  return knex("products as p")
    .join("products_categories as pc", "p.product_id", "pc.product_id")
    .join("categories as c", "pc.category_id", "c.category_id")
    .select("p.*", "c.*")
    .where({ "p.product_id": product_id })
    .first()
    .then (addCategory);
}





//add new query builder function to the service

function listOutOfStockCount() {
  return knex("products")
    .select("product_quantity_in_stock as out_of_stock")
    .count("product_id")
    .where({ product_quantity_in_stock: 0 })
    .groupBy("out_of_stock");
}


//add new query builder function to the service

function listPriceSummary() {
  return knex("products")
    .select("supplier_id")
    .min("product_price")
    .max("product_price")
    .avg("product_price")
    .groupBy("supplier_id");
}


//add new query builder function to the service

function listTotalWeightByProduct() {
  return knex("products")
    .select(
      "product_sku",
      "product_title",
      knex.raw(
     "sum(product_weight_in_lbs * product_quantity_in_stock) as total_weight_in_lbs"
      )
    )
    .groupBy("product_title", "product_sku");
}


//new query builder to join products and categories table



module.exports = {
  list, 
  read, 
  listOutOfStockCount,
  listPriceSummary,
  listTotalWeightByProduct,
};
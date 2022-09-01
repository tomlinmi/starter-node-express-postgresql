const knex = require("../db/connection");

function create(supplier) {
  return knex("suppliers")
    .insert(supplier)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}
//although api doesn't support get, you are creating read to use this function for validation in route handlers later on
function read(supplier_id) {
    return knex("suppliers").select("*").where({ supplier_id }).first();
  }
  
  function update(updatedSupplier) {
    return knex("suppliers")
      .select("*")
      .where({ supplier_id: updatedSupplier.supplier_id })
      .update(updatedSupplier, "*");
  }

  function destroy(supplier_id) {
    return knex("suppliers").where({ supplier_id }).del();
  }


module.exports = {
  create, 
  read,
  update,
  delete:destroy,

};


//for this API, only one supplier will ever be inserted at a time so you chain .then((createdRecords) => createdRecords[0]); } onto the query to return only the one inserted record.
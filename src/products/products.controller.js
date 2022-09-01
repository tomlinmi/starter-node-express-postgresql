const productsService = require("./products.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


/*Update the list() function to call the productsService.list() method and return a JSON response to the client on successful promise resolution, as follows:
*/

async function productExists(req, res, next) {
  const product = await productsService.read(req.params.productId);
  if (product) {
    res.locals.product = product;
    return next();
  }
  next({ status: 404, message: `Product cannot be found.` });
}

function read(req, res) {
  const { product: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await productsService.list();
  res.json({ data });
}

//new handler for list out of stock service, add to export
async function listOutOfStockCount(req, res, next) {
  res.json({ data: await productsService.listOutOfStockCount() });
}

//new handler for list price summary, add to export
async function listPriceSummary(req, res, next) {
  res.json({ data: await productsService.listPriceSummary() });
}

//new handler for total weight
async function listTotalWeightByProduct(req, res) {
  res.json({ data: await productsService.listTotalWeightByProduct() });
}


  module.exports = {
    read: [asyncErrorBoundary(productExists), read],
    list: asyncErrorBoundary(list),
    listOutOfStockCount: asyncErrorBoundary(listOutOfStockCount),
    listPriceSummary:asyncErrorBoundary(listPriceSummary),
    listTotalWeightByProduct: asyncErrorBoundary(listTotalWeightByProduct),

  };
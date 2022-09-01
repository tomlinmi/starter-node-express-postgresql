const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
//router.route("/:productId").get(controller.read).all(methodNotAllowed);

//to ensure the route param has just 1 or more digits, you can prepend the regex expression ([0-9]+) to the end of the path,
router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed);

router.route("/out-of-stock-count").get(controller.listOutOfStockCount).all(methodNotAllowed);

router.route("/price-summary").get(controller.listPriceSummary).all(methodNotAllowed);

router.route("/total-weight-by-product").get(controller.listTotalWeightByProduct).all(methodNotAllowed);

module.exports = router;

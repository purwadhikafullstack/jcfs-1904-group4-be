const router = require("express").Router();

const getAllProductsRouter = require("./get.products");
const getProductsByIdRouter = require("./get.products");

const deleteProductRouter = require("./delete.products");

const removeProductRouter = require("./put.products")

router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

router.use(deleteProductRouter);

router.use(removeProductRouter);

module.exports = router;
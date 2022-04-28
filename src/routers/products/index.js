const router = require("express").Router();

const getAllProductsRouter = require("./get.products");
const getProductsByIdRouter = require("./get.products");

const deleteProductRouter = require("./delete.products");

router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

router.use(deleteProductRouter);

module.exports = router;
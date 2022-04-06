const router = require("express").Router();

const { getAllProductsRouter, getProductsByIdRouter } = require("./get.products");

router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

module.exports = router;
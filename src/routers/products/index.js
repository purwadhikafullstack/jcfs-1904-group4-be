const router = require("express").Router();

const getAllProductsRouter = require("./get.products");
const getProductsByIdRouter = require("./get.products");

router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

module.exports = router;
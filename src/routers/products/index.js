const router = require("express").Router();

const getAllRouter = require("./get.products");
const getCountSearchRouter = require("./get.products");
const getAllProductsRouter = require("./get.products");
const getProductsByIdRouter = require("./get.products");

router.use(getAllRouter);
router.use(getCountSearchRouter);
router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

module.exports = router;
const router = require("express").Router();

const getProductsRouter = require("./get.products");

router.use(getProductsRouter);

module.exports = router;
const router = require("express").Router();

const getAllRouter = require("./get.products");
const getAllProductsRouter = require("./get.products");
const getProductsByIdRouter = require("./get.products");

const deleteProductRouter = require("./delete.products");

const removeProductRouter = require("./put.products");
const updateProductRouter = require("./put.products");

const postPhotoRouter = require("./post.products");
const postNewProductCategoryRouter = require("./post.products");
const postNewProductsRouter = require("./post.products");

router.use(getAllRouter);
router.use(getAllProductsRouter);
router.use(getProductsByIdRouter);

router.use(deleteProductRouter);

router.use(removeProductRouter);
router.use(updateProductRouter);

router.use(postPhotoRouter);
router.use(postNewProductCategoryRouter);
router.use(postNewProductsRouter);

module.exports = router;
const router = require("express").Router();

const { getAllCategoriesRouter } = require('./get.categories');

router.use(getAllCategoriesRouter);

module.exports = router;
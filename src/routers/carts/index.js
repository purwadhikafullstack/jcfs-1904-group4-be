const router = require("express").Router();

const getCartRouter = require('./get.cart')
const putCartQuantityRouter = require('./put.cart')
const deleteFromCartRouter = require('./delete.cart')

router.use(getCartRouter);
router.use(putCartQuantityRouter);
router.use(deleteFromCartRouter);

module.exports = router;
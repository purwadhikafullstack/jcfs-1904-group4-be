const router = require("express").Router();

const getCartRouter = require('./get.cart')
const getCartIdRouter = require('./get.cart')
const getCartByProductIdRouter = require('./get.cart')

const postNewCartRouter = require('./post.cart')
const postNewCartDetailsRouter = require('./post.cart')

const putCartQuantityRouter = require('./put.cart')

const deleteCartRouter = require('./delete.cart')
const deleteFromCartRouter = require('./delete.cart')

router.use(getCartRouter);
router.use(getCartIdRouter);
router.use(getCartByProductIdRouter);

router.use(postNewCartRouter);
router.use(postNewCartDetailsRouter);

router.use(putCartQuantityRouter);

router.use(deleteCartRouter);
router.use(deleteFromCartRouter);

module.exports = router;
const router = require("express").Router();

const getOrdersIdRouter = require('./get.orders');

const postNewOrdersRouter = require('./post.orders')
const postNewOrderDetailsRouter = require('./post.orders')

router.use(getOrdersIdRouter);

router.use(postNewOrdersRouter);
router.use(postNewOrderDetailsRouter);

module.exports = router;
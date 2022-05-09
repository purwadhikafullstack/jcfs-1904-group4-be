const router = require("express").Router();

const getUserAddressRouter = require('./get.address');
const getDefaultAddressRouter = require('./get.address'); 
const getChosenAddressRouter = require('./get.address');
const getTransactionAddressRouter = require('./get.address');

const postUserAddressRouter = require('./post.address');

const putDefaultAddressRouter = require('./put.address');
const putUserAddressRouter = require('./put.address');

router.use(getUserAddressRouter);
router.use(getChosenAddressRouter);
router.use(getDefaultAddressRouter);
router.use(getTransactionAddressRouter);

router.use(postUserAddressRouter);

router.use(putDefaultAddressRouter)
router.use(putUserAddressRouter)

module.exports = router;
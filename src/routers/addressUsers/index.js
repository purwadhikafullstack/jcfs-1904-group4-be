const router = require("express").Router();

const { getUserAddressRouter, getDefaultAddressRouter, getChosenAddressRouter } = require('./get.address');
const { postUserAddressRouter } = require('./post.address')
const { putUserAddressRouter } = require('./put.address')

router.use(getUserAddressRouter);
router.use(getChosenAddressRouter);
router.use(getDefaultAddressRouter);

router.use(postUserAddressRouter);

router.use(putUserAddressRouter)

module.exports = router;
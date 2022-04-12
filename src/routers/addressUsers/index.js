const router = require("express").Router();

const { getUserAddressRouter, getDefaultAddressRouter } = require('./get.address');
const { postUserAddressRouter } = require('./post.address')

router.use(getUserAddressRouter);
router.use(getDefaultAddressRouter);

router.use(postUserAddressRouter)

module.exports = router;
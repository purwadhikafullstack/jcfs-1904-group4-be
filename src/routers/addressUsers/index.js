const router = require("express").Router();

const { getUserAddressRouter, getDefaultAddressRouter, getChosenAddressRouter } = require('./get.address');
const { postUserAddressRouter } = require('./post.address')

router.use(getUserAddressRouter);
router.use(getChosenAddressRouter);
router.use(getDefaultAddressRouter);

router.use(postUserAddressRouter)

module.exports = router;
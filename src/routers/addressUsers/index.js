const router = require("express").Router();

const { getUserAddressRouter } = require('./get.address');

router.use(getUserAddressRouter);

module.exports = router;
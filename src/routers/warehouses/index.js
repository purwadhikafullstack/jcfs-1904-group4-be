const router = require("express").Router();

const getWarehouseRouter = require('./get.warehouse');

router.use(getWarehouseRouter)

module.exports = router;
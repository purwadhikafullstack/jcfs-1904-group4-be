const router = require('express').Router();

const getTotalSalesRouter = require('./get.salesReport');
const getThisMonthTotalSalesRouter = require('./get.salesReport');

router.use(getTotalSalesRouter);
router.use(getThisMonthTotalSalesRouter);

module.exports = router;

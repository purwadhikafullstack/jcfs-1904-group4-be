const router = require('express').Router();

const getTotalSalesRouter = require('./get.salesReport');
const getThisMonthTotalSalesRouter = require('./get.salesReport');
const getRangeMonthRouter = require('./get.salesReport');
const getRangeYearRouter = require('./get.salesReport');

router.use(getTotalSalesRouter);
router.use(getThisMonthTotalSalesRouter);
router.use(getRangeMonthRouter);
router.use(getRangeYearRouter);

module.exports = router;

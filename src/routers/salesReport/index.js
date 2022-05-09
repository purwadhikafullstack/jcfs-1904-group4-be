const router = require('express').Router();

const getTotalSalesRouter = require('./post.salesReport');
const getThisMonthTotalSalesRouter = require('./post.salesReport');
const getRangeMonthRouter = require('./post.salesReport');
const getRangeYearRouter = require('./post.salesReport');

router.use(getTotalSalesRouter);
router.use(getThisMonthTotalSalesRouter);
router.use(getRangeMonthRouter);
router.use(getRangeYearRouter);

module.exports = router;

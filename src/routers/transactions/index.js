const router = require("express").Router();

const postTransactionDetailsRouter = require('./post.transactions')
const postTransactionPhotoRouter = require('./post.transactions')
const postTransactionRouter = require('./post.transactions')
const postProofRouter = require('./post.transactions')

const getPastTransactionsRouter = require('./get.transactions')
const getSearchTransactionsRouter =require('./get.transactions')
const getTransactionDetailsRouter = require('./get.transactions')
const getAllTransactionsByIdRouter = require('./get.transactions')
const getOngoingTransactionsRouter = require('./get.transactions')
const getAllTransactionsByWarehouseRouter = require('./get.transactions')
const getPastTransactionsByWarehouseRouter = require('./get.transactions')
const getOngoingTransactionsByWarehouseRouter = require('./get.transactions')

const putStatusTransactionsRouter = require('./put.transactions')

router.use(postTransactionDetailsRouter);
router.use(postTransactionPhotoRouter);
router.use(postTransactionRouter);
router.use(postProofRouter);

router.use(getPastTransactionsRouter);
router.use(getSearchTransactionsRouter);
router.use(getTransactionDetailsRouter);
router.use(getAllTransactionsByIdRouter);
router.use(getOngoingTransactionsRouter);
router.use(getAllTransactionsByWarehouseRouter);
router.use(getPastTransactionsByWarehouseRouter);
router.use(getOngoingTransactionsByWarehouseRouter);

router.use(putStatusTransactionsRouter);

module.exports = router;
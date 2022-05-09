const router = require("express").Router();

const postTransactionDetailsRouter = require('./post.transactions')
const postTransactionPhotoRouter = require('./post.transactions')
const postTransactionRouter = require('./post.transactions')
const postProofRouter = require('./post.transactions')

const getAllTransactionsRouter = require('./get.transactions')
const getPastTransactionsRouter = require('./get.transactions')
const getOngoingTransactionsRouter = require('./get.transactions')
const getSearchTransactionsRouter =require('./get.transactions')

const getPastTransactionsByIdRouter = require('./get.transactions')
const getAllTransactionsByIdRouter = require('./get.transactions')
const getOngoingTransactionsByIdRouter = require('./get.transactions')

const getTransactionDetailsRouter = require('./get.transactions')

const getSearchTransactionsWhRouter =require('./get.transactions')
const getAllTransactionsByWarehouseRouter = require('./get.transactions')
const getPastTransactionsByWarehouseRouter = require('./get.transactions')
const getOngoingTransactionsByWarehouseRouter = require('./get.transactions')

const putStatusTransactionsRouter = require('./put.transactions')

router.use(postTransactionDetailsRouter);
router.use(postTransactionPhotoRouter);
router.use(postTransactionRouter);
router.use(postProofRouter);

router.use(getAllTransactionsRouter);
router.use(getPastTransactionsRouter);
router.use(getOngoingTransactionsRouter);
router.use(getSearchTransactionsRouter);

router.use(getAllTransactionsByIdRouter);
router.use(getPastTransactionsByIdRouter);
router.use(getOngoingTransactionsByIdRouter);

router.use(getTransactionDetailsRouter);

router.use(getSearchTransactionsWhRouter);
router.use(getAllTransactionsByWarehouseRouter);
router.use(getPastTransactionsByWarehouseRouter);
router.use(getOngoingTransactionsByWarehouseRouter);

router.use(putStatusTransactionsRouter);

module.exports = router;
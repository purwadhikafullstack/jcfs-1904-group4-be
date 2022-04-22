const router = require("express").Router();

const postTransactionDetailsRouter = require('./post.transactions')
const postTransactionRouter = require('./post.transactions')
const postProofRouter = require('./post.transactions')

router.use(postTransactionDetailsRouter);
router.use(postTransactionRouter);
router.use(postProofRouter);

module.exports = router;
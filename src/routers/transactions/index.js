const router = require("express").Router();

const postTransactionRouter = require('./post.transactions')
const postProofRouter = require('./post.transactions')

router.use(postTransactionRouter);
router.use(postProofRouter);

module.exports = router;
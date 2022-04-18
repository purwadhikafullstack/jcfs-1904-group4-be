const router = require("express").Router();

const postTransactionRouter = require('./post.transactions')

router.use(postTransactionRouter);

module.exports = router;
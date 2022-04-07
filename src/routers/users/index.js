const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const getAllUserRouter = require('./get.user');

router.use(postLoginUserRouter);
router.use(getAllUserRouter);

module.exports = router;


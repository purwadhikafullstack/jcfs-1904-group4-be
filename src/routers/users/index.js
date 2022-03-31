const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const getAllUserRouter = require('./get.user');
const getVerifyUserRouter = require('./get.user');

router.use(postLoginUserRouter);
router.use(getAllUserRouter);
router.use(getVerifyUserRouter);

module.exports = router;

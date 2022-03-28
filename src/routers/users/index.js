const router = require('express').Router();

const postLoginUserRouter = require('./post.user');

router.use(postLoginUserRouter);

module.exports = router;

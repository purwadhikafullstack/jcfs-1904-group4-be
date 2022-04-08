const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const postRegisterUserRouter = require('./post.user');
const postForgotPasswordRouter = require('./post.user');

const putResetPasswordRouter = require('./put.user');

const getAllUserRouter = require('./get.user');
const getVerifyUserRouter = require('./get.user');

router.use(postLoginUserRouter);
router.use(postRegisterUserRouter);
router.use(postForgotPasswordRouter);

router.use(putResetPasswordRouter);

router.use(getAllUserRouter);
router.use(getVerifyUserRouter);

module.exports = router;

const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const postRegisterUserRouter = require('./post.user');
const postForgotPasswordRouter = require('./post.user');
const postResetPasswordRouter = require('./post.user');

const getAllUserRouter = require('./get.user');
const getVerifyUserRouter = require('./get.user');

router.use(postLoginUserRouter);
router.use(postRegisterUserRouter);
router.use(postForgotPasswordRouter);
router.use(postResetPasswordRouter);

router.use(getAllUserRouter);
router.use(getVerifyUserRouter);

module.exports = router;

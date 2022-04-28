const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const postUserPhotoRouter = require('./post.user');
const postRegisterUserRouter = require('./post.user');
const postForgotPasswordRouter = require('./post.user');

const putUserDataRouter = require('./put.user')
const putResetPasswordRouter = require('./put.user');

const getAllUserRouter = require('./get.user');
const getUserByIdRouter = require('./get.user')
const getVerifyUserRouter = require('./get.user');
const getUserPictureRouter = require('./get.user')

router.use(postUserPhotoRouter);
router.use(postLoginUserRouter);
router.use(postRegisterUserRouter);
router.use(postForgotPasswordRouter);

router.use(putUserDataRouter);
router.use(putResetPasswordRouter);

router.use(getUserPictureRouter)
router.use(getUserByIdRouter)
router.use(getAllUserRouter);
router.use(getVerifyUserRouter);

module.exports = router;

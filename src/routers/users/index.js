const router = require('express').Router();

const {postLoginUserRouter, postUserPhotoRouter} = require('./post.user');
const {putUserData} = require('./put.user')
const getAllUserRouter = require('./get.user');

router.use(postUserPhotoRouter);
router.use(postLoginUserRouter);

router.use(putUserData);

router.use(getAllUserRouter);

module.exports = router;

const router = require('express').Router();

const {postLoginUserRouter, postUserPhotoRouter} = require('./post.user');
const getAllUserRouter = require('./get.user');

router.use(postUserPhotoRouter);
router.use(postLoginUserRouter);
router.use(getAllUserRouter);

module.exports = router;

<<<<<<< HEAD
// const router = require("express").Router();

// const postUsersRouter = require("./post.users");

// router.use(postUsersRouter);

// module.exports = router;
=======
const router = require('express').Router();

const postLoginUserRouter = require('./post.user');
const getAllUserRouter = require('./get.user');

router.use(postLoginUserRouter);
router.use(getAllUserRouter);

module.exports = router;
>>>>>>> ae27a734992da422389fede3765b340b6b493edd

const router = require('express').Router();
const pool = require('../../config/database');
const auth = require('../../middleware/auth');
const { verify } = require('../../services/token');

const getAllUser = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetUsers = `SELECT * FROM users;`;

    const result = await connection.query(sqlGetUsers);
    connection.release();

    const user = result[0];

    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetUserById = `SELECT * FROM users WHERE user_id = ${req.params.user_id};`;

    const result = await connection.query(sqlGetUserById);
    connection.release();

    const user = result[0];

    res.status(200).send({ user });
  } catch (error) {
    next(error);
  }
}

const getVerify = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const verifiedToken = verify(req.query.token);

    const sqlUpdateVerify = `UPDATE users SET is_verified = true WHERE user_id = ?`;

    const dataUpdateVerify = verifiedToken.id;

    const result = await connection.query(sqlUpdateVerify, dataUpdateVerify);
    connection.release();

    res.status(200).send('<h1>Verification Success</h1>');
  } catch (error) {
    console.log({ error });
  }
};

const getUserPicture = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();

      const sqlGetUserProfile = `SELECT profile_image_name FROM users WHERE user_id = ${req.params.user_id}`

      const result = await connection.query(sqlGetUserProfile);
      connection.release();

      res.status(200).send({ result });
  } catch (error) {
    next (error)
  }
};

router.get('/picture/:user_id', auth, getUserPicture)
router.get('/get/:user_id', getUserById)
router.get('/getAll', auth, getAllUser);
router.get('/verify', getVerify);

module.exports = router;

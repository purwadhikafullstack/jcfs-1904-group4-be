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

router.get('/getAll', auth, getAllUser);
router.get('/verify', getVerify);

module.exports = router;

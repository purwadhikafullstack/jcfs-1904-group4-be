const router = require('express').Router();
const pool = require('../../config/database');
const auth = require('../../middleware/auth');

const getAllUser = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

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
  } catch (error) {
    next(error);
  }
};

router.get('/', auth, getAllUser);

module.exports = router;

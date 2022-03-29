const connection = require('../../config/database');
const pool = require('../../config/database');
const { verify } = require('../../services/token');

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const verifiedToken = verify(token);

    const sqlGetUser = `SELECT * FROM users WHERE user_id = ?;`;
    const dataGetUser = verifiedToken.id;

    const connection = await pool.promise().getConnection();
    const result = await connection.query(sqlGetUser, dataGetUser);

    connection.release();

    const user = result[0];
    console.log(user);
  } catch (error) {
    next(error);
  }
};

module.exports = auth;

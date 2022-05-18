// const connection = require('../../config/database');
const pool = require("../../config/database");
const { verify } = require("../../services/token");

const auth = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const token = req.headers.authorization.replace("Bearer ", "");
    const verifiedToken = verify(token);

    const dataGetUser = verifiedToken.id;
    const sqlGetUser = `SELECT * FROM users WHERE user_id = ?;`;

    const result = await connection.query(sqlGetUser, dataGetUser);

    connection.release();

    const user = result[0];
    req.user = user;

    if (!user) {
      res.status(404).send({ message: "User not found" });
    }

    next();
  } catch (error) {
    connection.release();
    next(error);
  }
};

module.exports = auth;

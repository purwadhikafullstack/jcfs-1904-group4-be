const router = require("express").Router();
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const { sign, verify } = require("../../services/token");
const connection = await pool.promise().getConnection();

const putUserData = async (req, res, next) => {
  try {
    const sqlPutUserProfile = `UPDATE users SET ? WHERE user_id = ?;`;
    const dataPutUserProfile = [req.body, req.params.user_id];

    connection.query(sqlPutUserProfile, dataPutUserProfile);
    connection.release();

    res.status(200).send({ message: "Update was successful" });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const putResetPassword = async (req, res, next) => {
  try {
    const verifiedToken = verify(req.body.token);
    const sqlDataUser = bcrypt.hashSync(req.body.password);

    const sqlResetPassword = `UPDATE users SET password = ? WHERE user_id = ?`;
    const sqlDataResetPassword = [sqlDataUser, verifiedToken.id];

    const resultResetPassword = await connection.query(
      sqlResetPassword,
      sqlDataResetPassword
    );
    connection.release();

    const sqlGetResetPassword = `SELECT user_id, username, full_name, email, role, is_verified, warehouse_id FROM users where user_id = ?;`;
    const sqlDataGetResetPassword = verifiedToken.id;

    const resultGetResetPassword = await connection.query(
      sqlGetResetPassword,
      sqlDataGetResetPassword
    );
    connection.release();

    const user = resultGetResetPassword[0];
    const token = sign({ id: user[0].user_id });

    res.status(200).send({ user: user[0], token });
  } catch (error) {
    connection.release();
    console.log({ error });
  }
};

router.put("/:user_id", putUserData);
router.put("/reset-password", putResetPassword);

module.exports = router;

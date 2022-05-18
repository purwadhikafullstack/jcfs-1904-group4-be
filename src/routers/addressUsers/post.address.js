const router = require("express").Router();
const pool = require("../../config/database");

const postUserAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlPostUserAddress = "INSERT INTO address_users SET ?;";
    const dataPostUserAddress = [req.body];

    const result = await connection.query(
      sqlPostUserAddress,
      dataPostUserAddress
    );
    connection.release();

    res.status(200).send("Address successfully added");
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.post("/new", postUserAddress);

module.exports = router;

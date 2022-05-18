const router = require("express").Router();
const pool = require("../../config/database");

const getUserAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserAddress = "SELECT * FROM address_users WHERE user_id = ?";
    const dataGetUserAddress = req.params.user_id;

    const result = await connection.query(
      sqlGetUserAddress,
      dataGetUserAddress
    );
    connection.release();

    const address = result[0];

    res.status(200).send({ address });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getDefaultAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetDefaultAddress =
      "SELECT * FROM address_users WHERE user_id = ? AND is_default = 1";
    const dataGetDefaultAddress = req.params.user_id;

    const result = await connection.query(
      sqlGetDefaultAddress,
      dataGetDefaultAddress
    );
    connection.release();

    const address = result[0];

    res.status(200).send({ address });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getChosenAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetChosenAddress = `SELECT * FROM address_users WHERE address_id = ${req.params.address_id}`;

    const result = await connection.query(sqlGetChosenAddress);
    connection.release();

    const address = result[0];

    res.status(200).send({ address });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getTransactionAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetTransactionAddress = `SELECT a.address_id, province, city, village, district, postal_code, detail_address FROM address_users a
                                      JOIN transactions t ON a.address_id = t.address_id
                                      WHERE transaction_id = ${req.params.transaction_id};`;

    const result = await connection.query(sqlGetTransactionAddress);
    connection.release();

    const address = result[0];

    res.status(200).send({ address });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.get("/:user_id", getUserAddress);
router.get("/default/:user_id", getDefaultAddress);
router.get("/chosen/:address_id", getChosenAddress);
router.get("/transaction/:transaction_id", getTransactionAddress);

module.exports = router;

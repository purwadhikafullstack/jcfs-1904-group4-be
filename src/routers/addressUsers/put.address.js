const router = require("express").Router();
const pool = require("../../config/database");

const putDefaultAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlPutDefaultAddress = `UPDATE address_users SET is_default = 0 WHERE address_id = ${req.params.address_id} ;`;

    connection.query(sqlPutDefaultAddress);
    connection.release();

    res.status(200).send("Address is now no longer default");
  } catch (error) {
    connection.release();
    next(error);
  }
};

const putUserAddress = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlPutUserAddress =
      "UPDATE address_users SET ? WHERE address_id = ? ;";
    const dataPutUserAddress = [req.body, req.params.address_id];

    connection.query(sqlPutUserAddress, dataPutUserAddress);
    connection.release();

    res.status(200).send("Address successfully updated");
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.put("/put/:address_id", putUserAddress);
router.put("/removeDefault/:address_id", putDefaultAddress);

module.exports = router;

const router = require("express").Router();
const pool = require("../../config/database");
const connection = await pool.promise().getConnection();

const postNewCart = async (req, res, next) => {
  try {
    const sqlPostNewCart = `INSERT INTO carts (user_id) VALUES (?);`;
    const dataPostNewCart = [req.params.user_id];

    const [result] = await connection.query(sqlPostNewCart, dataPostNewCart);
    connection.release();

    const insertId = result.insertId;

    res.status(200).send({ insertId });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const postNewCartDetails = async (req, res, next) => {
  try {
    const sqlPostNewCartDetails = `INSERT INTO cart_details SET ?;`;
    const dataPostNewCartDetails = [req.body];

    connection.query(sqlPostNewCartDetails, dataPostNewCartDetails);
    connection.release();

    res.status(200).send("Successfully added to cart");
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.post("/add/:user_id", postNewCart);
router.post("/details", postNewCartDetails);

module.exports = router;

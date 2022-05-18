const router = require("express").Router();
const pool = require("../../config/database");
const connection = await pool.promise().getConnection();

const deleteFromCart = async (req, res, next) => {
  try {
    const sqlDeleteFromCart = `DELETE FROM cart_details WHERE cart_id = ${req.params.cart_id} AND product_id = ${req.params.product_id}`;

    connection.query(sqlDeleteFromCart);
    connection.release();

    res.status(200).send({ message: "Removed from cart" });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const deleteCart = async (req, res, next) => {
  try {
    const sqlDeleteCart = `DELETE FROM carts WHERE cart_id = ${req.params.cart_id}`;

    connection.query(sqlDeleteCart);
    connection.release();

    res.status(200).send({ message: "Removed from cart" });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.delete("/delete/:cart_id", deleteCart);
router.delete("/delete/:cart_id/:product_id", deleteFromCart);

module.exports = router;

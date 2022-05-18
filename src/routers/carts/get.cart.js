const router = require("express").Router();
const pool = require("../../config/database");

const getCart = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserCart = `SELECT c.cart_id, p.product_id, quantity, p.product_name, p.product_image_name, price FROM products p
                                        JOIN cart_details cd ON p.product_id = cd.product_id
                                        JOIN carts c ON cd.cart_id = c.cart_id
                                        WHERE user_id = ${req.params.user_id};`;

    const result = await connection.query(sqlGetUserCart);
    connection.release();

    const cart = result[0];

    res.status(200).send({ cart });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getCartByProductId = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserCartById = `SELECT quantity, c.cart_id FROM cart_details cd
                                        JOIN carts c ON cd.cart_id = c.cart_id
                                        WHERE user_id = ${req.params.user_id} 
                                        AND product_id = ${req.params.product_id}`;

    const result = await connection.query(sqlGetUserCartById);
    connection.release();

    const data = result[0];
    const cartProduct = data[0];

    res.status(200).send({ cartProduct });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getCartId = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetCartId = `SELECT cart_id FROM carts WHERE user_id = ${req.params.user_id}`;

    const result = await connection.query(sqlGetCartId);
    connection.release();

    const cart = result[0];
    const cart_id = cart[0];

    res.status(200).send({ cart_id });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.get("/:user_id", getCart);
router.get("/id/:user_id", getCartId);
router.get("/:user_id/:product_id", getCartByProductId);

module.exports = router;

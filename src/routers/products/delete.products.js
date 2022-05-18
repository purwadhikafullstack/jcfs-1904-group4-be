const router = require("express").Router();
const pool = require("../../config/database");
const connection = await pool.promise().getConnection();

const deleteProduct = async (req, res, next) => {
  try {
    const sqlDeleteProducts = `DELETE FROM products WHERE product_id = ${req.params.product_id};`;

    connection.query(sqlDeleteProducts);
    connection.release();

    res.status(200).send("Product has been deleted");
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.delete("/delete/:product_id", deleteProduct);

module.exports = router;

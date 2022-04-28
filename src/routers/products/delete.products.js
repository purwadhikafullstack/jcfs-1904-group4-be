const router = require("express").Router();
const pool = require("../../config/database");

const deleteProduct = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlDeleteProducts = `DELETE FROM products WHERE product_id = ${req.params.product_id};`;
  
      connection.query(sqlDeleteProducts);
      connection.release();
      
      res.status(200).send("Product has been deleted")
    } catch (error) {
      next(error);
    }
  };

router.delete("/delete/:product_id", deleteProduct)

module.exports = router;
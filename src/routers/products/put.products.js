const router = require("express").Router();
const pool = require("../../config/database");

const removeProduct = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlRemoveProducts = `UPDATE products SET is_deleted = 1 WHERE product_id = ${req.params.product_id};`;
  
      connection.query(sqlRemoveProducts);
      connection.release();
      
      res.status(200).send("Product has been deleted")
    } catch (error) {
      next(error);
    }
  };

router.put("/remove", removeProduct)

module.exports = router;
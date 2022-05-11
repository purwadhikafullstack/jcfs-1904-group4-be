const router = require("express").Router();
const pool = require("../../config/database");

const removeProduct = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlRemoveProducts = `UPDATE products SET is_deleted = 1 WHERE product_id = ${req.params.product_id};`;
  
      connection.query(sqlRemoveProducts);
      connection.release();
      
      res.status(200).send("Product has been removed")
    } catch (error) {
      next(error);
    }
  };

const updateProduct = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlUpdateProducts = `UPDATE products SET 
                                 product_name = '${req.body.product_name}', 
                                 product_desc = '${req.body.product_desc}', 
                                 price = ${req.body.price} 
                                 WHERE product_id = ${req.params.product_id};`;

      const sqlUpdateProductCategory = `UPDATE product_categories SET
                                        product_id = ${req.params.product_id},
                                        category_id = ${req.body.category_id};`;
  
      connection.query(sqlUpdateProducts, sqlUpdateProductCategory);
      connection.release();
      
      res.status(200).send("Product has been updated")
    } catch (error) {
      next(error);
    }
  };

router.put("/remove/:product_id", removeProduct)
router.put("/update/:product_id", updateProduct)

module.exports = router;
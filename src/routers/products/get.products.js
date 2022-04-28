const router = require("express").Router();
const pool = require("../../config/database");

// Get All Products OR Get Searched Products
const getAllProducts = async (req, res, next) => {

      try {
              const connection = await pool.promise().getConnection();

              const sqlCountAllProducts = `SELECT COUNT(*) AS count FROM products WHERE is_deleted = 0;`;

              const sqlGetAllProducts = `SELECT product_name, p.product_id, product_desc, product_image_name, price, c.category_id, category_name FROM products p 
                                         JOIN product_categories pc ON p.product_id = pc.product_id 
                                         JOIN categories c ON pc.category_id = c.category_id
                                         WHERE is_deleted = 0
                                         ORDER BY product_name DESC LIMIT ? OFFSET ?;`;
              const dataGetAllProducts = [ Number(req.query.itemsPerPage), Number(req.query.OFFSET) ]

              // Query base tanpa WHERE category_name
              // Jika req.query.category_name ada isinya, Query base disisipkan WHERE category_name
              
              const filterCategory = req.query.category_id ? ` WHERE category_id = "${req.query.category_id}"` : "";

              const sqlCountSearchProducts = `SELECT COUNT(*) AS count FROM product_categories pc
                                              JOIN products p ON p.product_id = pc.product_id 
                                              ${filterCategory} AND is_deleted = 0
                                              AND product_name LIKE '%${req.query.product_name}%';`;

              const sqlGetSearchProducts = `SELECT product_name, p.product_id, product_desc, product_image_name, price, c.category_id, category_name FROM products p 
                                            JOIN product_categories pc ON p.product_id = pc.product_id 
                                            JOIN categories c ON pc.category_id = c.category_id
                                            ${filterCategory} AND product_name LIKE '%${req.query.product_name}%' AND is_deleted = 0 
                                            ORDER BY ${req.query.sortBy} ${req.query.typeSort} LIMIT ? OFFSET ?;`;
              const dataGetSearchProducts = [ Number(req.query.itemsPerPage), Number(req.query.OFFSET) ]

          if (req.query.category_id || req.query.product_name || req.query.sortBy || req.query.typeSort) {

              const [result] = await connection.query(sqlGetSearchProducts, dataGetSearchProducts)
              const [count] = await connection.query(sqlCountSearchProducts)
              connection.release();

              res.status(200).send({ result, count });

          } else {

              const [result] = await connection.query(sqlGetAllProducts, dataGetAllProducts)
              const [count] = await connection.query(sqlCountAllProducts)
              connection.release();

              res.status(200).send({ result, count });

          }
    } catch (error) {
      next (error)
    }
};

// Get Products by ID
const getProductsById = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetProductsById = 'SELECT * FROM products WHERE product_id = ?;';
    const sqlDataProductsById = req.params.product_id;

    const result = await connection.query(sqlGetProductsById, sqlDataProductsById);
    connection.release();

    const productsById = result[0]
    
    res.status(200).send({ productsById })
  } catch (error) {
    next(error);
  }
};

router.get("/get", getAllProducts);
router.get("/:product_id", getProductsById);

module.exports = router;
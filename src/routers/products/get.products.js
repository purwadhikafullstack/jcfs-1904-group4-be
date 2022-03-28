const router = require("express").Router();
const pool = require("../../config/database");

const getAllProducts = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
        await connection.beginTransaction();
    
        try {
            const connection = await pool.promise().getConnection();

            const sqlGetAllProducts = 'SELECT * FROM products;';

            const result = await connection.query(sqlGetAllProducts)
            connection.release();

            const products = result[0]

            res.status(200).send({ products })
        } catch (error) {
          next (error)
        }
    } catch (error) {
      next (error)
    };
};

router.get("/get", getAllProducts);

module.exports = router;

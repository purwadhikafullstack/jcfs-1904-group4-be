const router = require("express").Router();
const pool = require("../../config/database");

const getCart = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();
    
                const sqlGetUserCart = `SELECT product_id, product_name, product_price, quantity FROM carts WHERE user_id = ${req.params.user_id}`;
    
                const result = await connection.query(sqlGetUserCart)
                connection.release();
    
                const cart = result[0]

                res.status(200).send({ cart })
            } catch (error) {
              next (error)
        }
    };
    
router.get('/:user_id', getCart)
    
module.exports = router;
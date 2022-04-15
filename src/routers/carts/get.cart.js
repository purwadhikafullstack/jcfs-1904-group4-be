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

const getCartById = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

            const sqlGetUserCartById = `SELECT product_id, product_name, product_price, quantity FROM carts 
                                        WHERE user_id = ${req.params.user_id} AND product_id = ${req.params.product_id}`;

            const result = await connection.query(sqlGetUserCartById)
            connection.release();

            const cart = result[0]

            res.status(200).send({ cart })
        } catch (error) {
          next (error)
    }
};
    
router.get('/:user_id', getCart)
router.get('/:user_id/:product_id', getCartById)
    
module.exports = router;
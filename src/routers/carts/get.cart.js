const router = require("express").Router();
const pool = require("../../config/database");

const getCart = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();
    
                const sqlGetUserCart = `SELECT c.cart_id, p.product_id, quantity, p.product_name, p.product_image_name, price FROM products p
                                        JOIN cart_details cd ON p.product_id = cd.product_id
                                        JOIN carts c ON cd.cart_id = c.cart_id
                                        WHERE user_id = ${req.params.user_id};`;
    
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

            const sqlGetUserCartById = `SELECT quantity FROM carts 
                                        WHERE user_id = ${req.params.user_id} AND product_id = ${req.params.product_id}`;

            const result = await connection.query(sqlGetUserCartById)
            connection.release();

            const cart = result[0]
            const quantity = cart[0]

            res.status(200).send({ quantity })
        } catch (error) {
          next (error)
    }
};
    
router.get('/:user_id', getCart)
router.get('/:user_id/:product_id', getCartById)
    
module.exports = router;
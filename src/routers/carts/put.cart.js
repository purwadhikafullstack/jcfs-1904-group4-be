const router = require("express").Router();
const pool = require("../../config/database");

const putCartQuantity = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();
    
                const sqlPutCartQuantity = `UPDATE cart_details SET quantity = ? WHERE cart_id = ? AND product_id = ?`;
                const dataPutCartQuantity = [ req.body.quantity, req.params.cart_id, req.body.product_id ]

                connection.query(sqlPutCartQuantity, dataPutCartQuantity)
                connection.release();

                res.status(200).send({ message: "Cart updated" })
            } catch (error) {
              next (error)
        }
    };
    
router.put('/quantity/:cart_id', putCartQuantity)
    
module.exports = router;
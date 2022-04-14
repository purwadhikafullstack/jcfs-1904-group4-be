const router = require("express").Router();
const pool = require("../../config/database");

const deleteFromCart = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

            const sqlDeleteFromCart = `DELETE FROM carts WHERE user_id = ${req.params.user_id} AND product_id = ${req.params.product_id}`;

            connection.query(sqlDeleteFromCart)
            connection.release();

            res.status(200).send({ message: "Removed from cart" })
        } catch (error) {
          next (error)
    }
};

router.delete('/delete/:user_id/:product_id', deleteFromCart)

module.exports = router;
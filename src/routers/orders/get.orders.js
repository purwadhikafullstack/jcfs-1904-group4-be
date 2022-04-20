const router = require("express").Router();
const pool = require("../../config/database");

const getOrdersId = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

            const sqlGetOrdersId = `SELECT order_id FROM orders WHERE user_id = ${req.params.user_id}`;

            const result = await connection.query(sqlGetOrdersId)
            connection.release();

            const orders = result[0]
            const order_id = orders[0]

            res.status(200).send({ order_id })
        } catch (error) {
          next (error)
    }
};

router.get('/getId/:user_id', getOrdersId)

module.exports = router;
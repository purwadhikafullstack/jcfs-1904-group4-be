const router = require("express").Router();
const pool = require("../../config/database");
const generateString = require("../../services/helpers");

const postNewOrders = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

            const sqlPostNewOrders = `INSERT INTO orders SET ?;`;
            const dataPostNewOrders = [ req.body ];

            const [result] = await connection.query(sqlPostNewOrders, dataPostNewOrders)
            connection.release();

            const insertId = result.insertId

            res.status(200).send({ insertId })
        } catch (error) {
          next (error)
    }
};

const postNewOrderDetails = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
        const { order_id, carts } = req.body

        const sqlPostNewDetails = `INSERT INTO order_details (order_id, product_id, quantity, price) 
                                   VALUES ${generateString(order_id, carts)};`;
            
        connection.query(sqlPostNewDetails)
        connection.release();

        console.log(sqlPostNewDetails)

        res.status(200).send("Successfully added to orders")
        } catch (error) {
          next (error)
    }
};

router.post('/new', postNewOrders)
router.post('/details', postNewOrderDetails)

module.exports = router;
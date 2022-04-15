const router = require("express").Router();
const pool = require("../../config/database");

const postNewCart = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

            const sqlPostUserAddress = `INSERT INTO carts SET ?;`;
            const dataPostUserAddress = [ req.body ]

            connection.query(sqlPostUserAddress, dataPostUserAddress)
            connection.release();

            res.status(200).send("Successfullt added to cart")
        } catch (error) {
          next (error)
    }
};

router.post('/add', postNewCart)

module.exports = router;
const router = require("express").Router();
const pool = require("../../config/database");

const putUserAddress = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();

            const sqlPutUserAddress = "UPDATE address_users SET ? WHERE address_id = ? ;";
            const dataPutUserAddress = [ req.body, req.params.address_id ]

            const result = await connection.query(sqlPutUserAddress, dataPutUserAddress)
            connection.release();

            res.status(200).send("Address successfully updated")
        } catch (error) {
          next (error)
        }
};

router.put("/put/:address_id", putUserAddress)

module.exports = router;
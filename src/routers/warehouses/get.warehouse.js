const router = require("express").Router();
const pool = require("../../config/database");

const getWarehouse = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();
    
                const sqlWarehouse = `SELECT warehouse_id, warehouse_name, province FROM warehouses`;
    
                const result = await connection.query(sqlWarehouse)
                connection.release();
    
                const warehouse = result[0]

                res.status(200).send({ warehouse })
            } catch (error) {
              next (error)
        }
};

router.get('/get', getWarehouse)

module.exports = router;
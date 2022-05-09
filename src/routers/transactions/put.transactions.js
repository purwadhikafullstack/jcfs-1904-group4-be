const router = require("express").Router();
const pool = require("../../config/database");

const putPhotoTransactions = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    
        const sqlPutStatusTransactions = `UPDATE transactions SET status = "waiting_confirmation"
                                          WHERE user_id = ${req.params.user_id} 
                                          AND transaction_id = ${req.params.transaction_id};`;
    
        connection.query(sqlPutStatusTransactions);
        connection.release();
        
        res.status(200).send("Status successfully updated")
      } catch (error) {
        next(error);
      }
};

router.put('/status/:user_id/:transaction_id', putPhotoTransactions)

module.exports = router;
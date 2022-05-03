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

const putConfirmPhoto = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlPutConfirmPhoto = `UPDATE transactions SET status = "payment_accepted"
                                  WHERE transaction_id = ${req.params.transaction_id};`;
  
      connection.query(sqlPutConfirmPhoto);
      connection.release();
      
      res.status(200).send("Photo successfully confirmed")
    } catch (error) {
      next(error);
    }
};

const putRejectPhoto = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlPutRejectPhoto = `UPDATE transactions SET status = "payment_rejected"
                                 WHERE transaction_id = ${req.params.transaction_id};`;
  
      connection.query(sqlPutRejectPhoto);
      connection.release();
      
      res.status(200).send("Photo successfully rejected")
    } catch (error) {
      next(error);
    }
};

router.put('/reject/:transaction_id', putRejectPhoto)
router.put('/confirm/:transaction_id', putConfirmPhoto)
router.put('/status/:user_id/:transaction_id', putPhotoTransactions)

module.exports = router;
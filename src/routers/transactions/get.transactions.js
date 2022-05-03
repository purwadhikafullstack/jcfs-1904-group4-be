const router = require("express").Router();
const pool = require("../../config/database");

const getAllTransactions = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
    
        const sqlGetAllTransactions = `SELECT * FROM transactions WHERE user_id = ?;`;
        const sqlDataAllTransactions = req.params.user_id;
    
        const result = await connection.query(sqlGetAllTransactions, sqlDataAllTransactions);
        connection.release();

        const transactions = result[0]
        
        res.status(200).send({ transactions })
      } catch (error) {
        next(error);
      }
};

const getOngoingTransactions = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetOngoingTransactions = `SELECT * FROM transactions WHERE user_id = ${req.params.user_id} AND 
                                         status = 'waiting_payment' OR status = 'waiting_confirmation' 
                                         OR status = 'payment_accepted' OR status = 'payment_rejected'
                                         OR status = 'shipped'`;

      const result = await connection.query(sqlGetOngoingTransactions);
      connection.release();

      const transactions = result[0]
      
      res.status(200).send({ transactions })
    } catch (error) {
      next(error);
    }
};

const getPastTransactions = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetPastTransactions = `SELECT * FROM transactions WHERE user_id = ${req.params.user_id} AND 
                                      status = 'arrived`;

      const result = await connection.query(sqlGetPastTransactions);
      connection.release();

      const transactions = result[0]
      
      res.status(200).send({ transactions })
    } catch (error) {
      next(error);
    }
};

const getTransactionDetails = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetTransactionDetails = `SELECT p.product_id, product_name, td.price, quantity FROM transaction_details td
                                        JOIN products p ON td.product_id = p.product_id 
                                        WHERE transaction_id = ${req.params.transaction_id};`;
  
      const result = await connection.query(sqlGetTransactionDetails);
      connection.release();

      const transactions = result[0]
      
      res.status(200).send({ transactions })
    } catch (error) {
      next(error);
    }
};

const getSearchTransactions = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetSearchTransaction = `SELECT * FROM transactions 
                                       WHERE user_id = ${req.params.user_id} 
                                       AND warehouse_id = ${req.params.id};`;
  
      const result = await connection.query(sqlGetSearchTransaction);
      connection.release();

      const transactions = result[0]
      
      res.status(200).send({ transactions })
    } catch (error) {
      next(error);
    }
};

router.get('/get/:user_id', getAllTransactions)
router.get('/get/past/:user_id', getPastTransactions)
router.get('/get/:user_id/:id', getSearchTransactions)
router.get('/get/ongoing/:user_id', getOngoingTransactions)
router.get('/get/details/:transaction_id', getTransactionDetails)

module.exports = router;
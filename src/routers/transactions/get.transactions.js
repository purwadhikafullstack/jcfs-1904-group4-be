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

router.get('/get/:user_id', getAllTransactions)

module.exports = router;
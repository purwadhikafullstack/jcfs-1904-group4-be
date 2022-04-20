const router = require('express').Router();
const pool = require('../../config/database');
const auth = require('../../middleware/auth');

const getTotalSales = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetTotalTransaction = `SELECT SUM (amount_price) FROM transactions WHERE warehouse_id = ?;`;

    const sqlData = req.body.warehouse_id;

    const result = await connection.query(sqlGetTotalTransaction, sqlData);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    next(error);
  }
};

const getThisMonthTotalSales = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetTotalTransaction = `SELECT SUM (amount_price) FROM transactions WHERE MONTH(updated_at) = MONTH(CURRENT_DATE()) AND warehouse_id = ?;`;

    const sqlData = req.body.warehouse_id;

    const result = await connection.query(sqlGetTotalTransaction, sqlData);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    next(error);
  }
};

router.get('/total-sales', getTotalSales);
router.get('/month-total-sales', getThisMonthTotalSales);

module.exports = router;

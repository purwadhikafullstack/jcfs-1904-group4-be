var moment = require("moment");
moment().format();
const router = require("express").Router();
const pool = require("../../config/database");
const auth = require("../../middleware/auth");

const getTotalSales = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetTotalTransaction = `SELECT SUM (amount_price) as total_sales FROM transactions WHERE status = "arrived" AND warehouse_id = ?;`;

    const sqlData = req.body.warehouse_id;

    const result = await connection.query(sqlGetTotalTransaction, sqlData);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getThisMonthTotalSales = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetTotalTransaction = `SELECT SUM(amount_price) as total_price FROM transactions WHERE MONTH(created_at) = MONTH(now()) AND YEAR(created_at) = YEAR(now()) AND status = "arrived" AND warehouse_id = ?;`;

    const sqlData = req.body.warehouse_id;

    const result = await connection.query(sqlGetTotalTransaction, sqlData);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getRangeMonth = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const dataStartMonth = req.body.start_month;
    const dataEndMonth = req.body.end_month;

    const startMonthMod = moment(dataStartMonth).format("YYYY-MM-DD");
    const endMonthMod = moment(dataEndMonth)
      .add(1, "months")
      .format("YYYY-MM-DD");

    const sqlGetRangeMonth = `SELECT YEAR(created_at), MONTH(created_at), SUM(amount_price) AS total_sales FROM transactions WHERE warehouse_id = ? AND status = 'arrived' AND (created_at BETWEEN "${startMonthMod}" AND "${endMonthMod}") GROUP BY YEAR(created_at), MONTH(created_at) ORDER BY YEAR(created_at), MONTH(created_at);`;
    const sqlWarehouseId = req.body.warehouse_id;

    const result = await connection.query(sqlGetRangeMonth, sqlWarehouseId);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getRangeYear = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const dataStartYear = req.body.start_year;
    const dataEndYear = req.body.end_year;

    const startYearMod = moment(dataStartYear).format("YYYY-MM-DD");
    const endYearMod = moment(dataEndYear).add(1, "years").format("YYYY-MM-DD");

    const sqlGetRangeYear = `SELECT YEAR(created_at), SUM(amount_price) AS total_sales FROM transactions WHERE warehouse_id = ? AND status = 'arrived' AND (created_at BETWEEN "${startYearMod}" AND "${endYearMod}") GROUP BY YEAR(created_at) ORDER BY YEAR(created_at);`;
    const sqlWarehouseId = req.body.warehouse_id;

    const result = await connection.query(sqlGetRangeYear, sqlWarehouseId);
    connection.release();

    const totalSales = result[0];

    res.status(200).send({ totalSales });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.post("/total-sales", getTotalSales);
router.post("/month-total-sales", getThisMonthTotalSales);
router.post("/range-month-report", getRangeMonth);
router.post("/range-year-report", getRangeYear);

module.exports = router;

const router = require("express").Router();
const pool = require("../../config/database");

const getAllTransactions = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetAllTransactions = `SELECT * FROM transactions ORDER BY created_at DESC;`;

    const result = await connection.query(sqlGetAllTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getPastTransactions = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetPastTransactions = `SELECT * FROM transactions WHERE 
                                      status = 'arrived'
                                      ORDER BY created_at DESC`;

    const result = await connection.query(sqlGetPastTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getOngoingTransactions = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetOngoingTransactions = `SELECT * FROM transactions WHERE 
                                         status = 'waiting_payment' 
                                         OR status = 'waiting_confirmation' 
                                         OR status = 'payment_accepted' 
                                         OR status = 'payment_rejected'
                                         OR status = 'shipped' 
                                         ORDER BY created_at DESC`;

    const result = await connection.query(sqlGetOngoingTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getSearchTransactions = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetSearchTransaction = `SELECT * FROM transactions WHERE 
                                       recipient LIKE '%${req.query.recipient_name}%' 
                                       ORDER BY created_at DESC;`;

    const result = await connection.query(sqlGetSearchTransaction);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getAllTransactionsById = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetAllTransactionsById = `SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC;`;
    const sqlDataAllTransactionsById = req.params.user_id;

    const result = await connection.query(
      sqlGetAllTransactionsById,
      sqlDataAllTransactionsById
    );
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getOngoingTransactionsById = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetOngoingTransactions = `SELECT * FROM transactions WHERE user_id = ${req.params.user_id} AND 
                                         status = 'waiting_payment' OR status = 'waiting_confirmation' 
                                         OR status = 'payment_accepted' OR status = 'payment_rejected'
                                         OR status = 'shipped' ORDER BY created_at DESC`;

    const result = await connection.query(sqlGetOngoingTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getPastTransactionsById = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetPastTransactions = `SELECT * FROM transactions WHERE user_id = ${req.params.user_id} AND 
                                      status = 'arrived' ORDER BY created_at DESC`;

    const result = await connection.query(sqlGetPastTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getTransactionDetails = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetTransactionDetails = `SELECT p.product_id, product_name, td.price, quantity FROM transaction_details td
                                        JOIN products p ON td.product_id = p.product_id 
                                        WHERE transaction_id = ${req.params.transaction_id};`;

    const result = await connection.query(sqlGetTransactionDetails);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getAllTransactionsByWarehouse = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetAllTransactions = `SELECT * FROM transactions WHERE warehouse_id = ? ORDER BY created_at DESC;`;
    const sqlDataAllTransactions = req.params.warehouse_id;

    const result = await connection.query(
      sqlGetAllTransactions,
      sqlDataAllTransactions
    );
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getOngoingTransactionsByWarehouse = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetOngoingTransactions = `SELECT * FROM transactions WHERE warehouse_id = ${req.params.warehouse_id} AND 
                                         status = 'waiting_payment' OR status = 'waiting_confirmation' 
                                         OR status = 'payment_accepted' OR status = 'payment_rejected'
                                         OR status = 'shipped' ORDER BY created_at DESC`;

    const result = await connection.query(sqlGetOngoingTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getPastTransactionsByWarehouse = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetPastTransactions = `SELECT * FROM transactions WHERE warehouse_id = ${req.params.warehouse_id} AND 
                                      status = 'arrived' ORDER BY created_at DESC;`;

    const result = await connection.query(sqlGetPastTransactions);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getSearchTransactionsWh = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetSearchTransaction = `SELECT * FROM transactions 
                                       WHERE recipient LIKE '%${req.query.recipient_name}%' 
                                       AND warehouse_id = ${req.query.warehouse_id} ORDER BY created_at DESC;`;

    const result = await connection.query(sqlGetSearchTransaction);
    connection.release();

    const transactions = result[0];

    res.status(200).send({ transactions });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.get("/all", getAllTransactions);
router.get("/past", getPastTransactions);
router.get("/ongoing", getOngoingTransactions);
router.get("/search", getSearchTransactions);

router.get("/get/:user_id", getAllTransactionsById);
router.get("/get/past/:user_id", getPastTransactionsById);
router.get("/get/ongoing/:user_id", getOngoingTransactionsById);

router.get("/get/details/:transaction_id", getTransactionDetails);

router.get("/wh/search", getSearchTransactionsWh);
router.get("/wh/all/:warehouse_id", getAllTransactionsByWarehouse);
router.get("/wh/past/:warehouse_id", getPastTransactionsByWarehouse);
router.get("/wh/ongoing/:warehouse_id", getOngoingTransactionsByWarehouse);

module.exports = router;

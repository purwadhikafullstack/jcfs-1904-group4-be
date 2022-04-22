const router = require("express").Router();
const pool = require("../../config/database");
const generateString = require("../../services/helpers");

const postTransaction = async (req, res, next) => {
  try {
        const connection = await pool.promise().getConnection();

        const sqlPostTransaction = "INSERT INTO transactions SET ?;";
        const dataPostTransaction = [ req.body ]

        const [result] = await connection.query(sqlPostTransaction, dataPostTransaction)
        connection.release();

        const insertId = result.insertId

        res.status(200).send({ insertId })
    } catch (error) {
      next (error)
    }
};

const postTransactionDetails = async (req, res, next) => {
  try {
        const connection = await pool.promise().getConnection();
        const { transaction_id, carts } = req.body

        const sqlPostTransactionDetails = `INSERT INTO transaction_details (transaction_id, product_id, quantity, price) 
                                  VALUES ${generateString(transaction_id, carts)};`;
            
        connection.query(sqlPostTransactionDetails)
        connection.release();

        console.log(sqlPostTransactionDetails)

        res.status(200).send("Successfully added to orders")
    } catch (error) {
      next (error)
    }
};

const postProof = async (req, res, next) => {
  try {
        const connection = await pool.promise().getConnection();

        const sqlPostProof = "INSERT INTO transactions SET ?;";
        const dataPostProof = [ req.body ]

        const result = await connection.query(sqlPostProof, dataPostProof)
        connection.release();

        res.status(200).send({ result })
    } catch (error) {
      next (error)
    }
};

router.post("/new", postTransaction)
router.post("/details", postTransactionDetails)
router.post("/proof", postProof)

module.exports = router;
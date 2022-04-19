const router = require("express").Router();
const pool = require("../../config/database");

const postTransaction = async (req, res, next) => {
        try {
            const connection = await pool.promise().getConnection();

            const sqlPostTransaction = "INSERT INTO transactions SET ?;";
            const dataPostTransaction = [ req.body ]

            connection.query(sqlPostTransaction, dataPostTransaction)
            connection.release();

            res.status(200).send("Order Successful")
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
router.post("/proof", postProof)

module.exports = router;
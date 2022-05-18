const router = require("express").Router();
const pool = require("../../config/database");
const uploadTransaction = require("../../services/upload/transactions");
const generateString = require("../../services/helpers");

const postTransaction = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlPostTransaction = "INSERT INTO transactions SET ?;";
    const dataPostTransaction = [req.body];

    const [result] = await connection.query(
      sqlPostTransaction,
      dataPostTransaction
    );
    connection.release();

    const insertId = result.insertId;

    res.status(200).send({ insertId });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const postTransactionDetails = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const { transaction_id, carts } = req.body;

    const sqlPostTransactionDetails = `INSERT INTO transaction_details (transaction_id, product_id, quantity, price) 
                                           VALUES ${generateString(
                                             transaction_id,
                                             carts
                                           )};`;

    connection.query(sqlPostTransactionDetails);
    connection.release();

    res.status(200).send("Successfully added to orders");
  } catch (error) {
    connection.release();
    next(error);
  }
};

// Upload Photo
const multerUpload = uploadTransaction.single("photo");
const postTransactionPhoto = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlPostUserPhoto = `UPDATE transactions SET proof_image = ? WHERE user_id = ?;`;
    const dataPostUserPhoto = [req.file.filename, req.params.user_id];

    connection.query(sqlPostUserPhoto, dataPostUserPhoto);
    connection.release();

    res.status(200).send("Proof successfully uploaded");
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.post("/new", postTransaction);
router.post("/details", postTransactionDetails);
router.post(
  "/photo/:user_id/:transaction_id",
  multerUpload,
  postTransactionPhoto
);

module.exports = router;

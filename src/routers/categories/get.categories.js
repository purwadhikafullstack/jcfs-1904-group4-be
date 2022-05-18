const router = require("express").Router();
const pool = require("../../config/database");
const connection = await pool.promise().getConnection();

// Product Category
const getAllCategories = async (req, res, next) => {
  try {
    await connection.beginTransaction();

    try {
      const sqlGetAllProducts = "SELECT * FROM categories;";

      const result = await connection.query(sqlGetAllProducts);
      connection.release();

      const categories = result[0];

      res.status(200).send({ categories });
    } catch (error) {
      connection.release();
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

router.get("/get", getAllCategories);

module.exports = router;

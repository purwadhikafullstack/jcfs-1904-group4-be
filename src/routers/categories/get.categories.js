const router = require("express").Router();
const pool = require("../../config/database");

// Product Category
const getAllCategoriesRouter = router.get("/get", async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
        await connection.beginTransaction();
    
        try {
            const connection = await pool.promise().getConnection();

            const sqlGetAllProducts = "SELECT * FROM categories;";

            const result = await connection.query(sqlGetAllProducts)
            connection.release();

            const categories = result[0]

            res.status(200).send({ categories })
        } catch (error) {
          next (error)
        }
    } catch (error) {
      next (error)
    };
});

module.exports = { getAllCategoriesRouter };
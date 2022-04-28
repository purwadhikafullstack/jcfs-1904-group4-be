const router = require("express").Router();
const pool = require("../../config/database");

const postNewProducts = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
  
        const sqlPostNewProducts = 'INSERT INTO products SET ?';
        const dataPostNewProducts = [ req.body ]
  
        connection.query(sqlPostNewProducts, dataPostNewProducts);
        connection.release();
  
        res.status(200).send("Successfully added product");
    } catch (error) {
        next (error)
    }
};

router.post('/new', postNewProducts);

module.exports = router;
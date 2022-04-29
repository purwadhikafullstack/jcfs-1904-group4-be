const router = require("express").Router();
const pool = require("../../config/database");
const uploadProduct = require("../../services/upload/prodcts")

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

const multerUpload = uploadProduct.single('photo');
const postPhoto = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();

      const sqlPostPhoto = `UPDATE products SET product_image_name = ? WHERE product_id = ?;`;
      const dataPostPhoto = [req.file.filename, req.params.product_id]

      connection.query(sqlPostPhoto, dataPostPhoto);
      connection.release();

      res.status(200).send("Proof successfully uploaded");
  } catch (error) {
    next (error)
  }
};

router.post('/new', postNewProducts);
router.post('/photo/:product_id', multerUpload, postPhoto);

module.exports = router;
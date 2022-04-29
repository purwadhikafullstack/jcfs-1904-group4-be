const router = require("express").Router();
const pool = require("../../config/database");
const uploadProduct = require("../../services/upload/products")

const postNewProducts = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
  
        const sqlPostNewProducts = 'INSERT INTO products SET ?';
        const dataPostNewProducts = [ req.body ]
  
        const result = await connection.query(sqlPostNewProducts, dataPostNewProducts);
        connection.release();

        const { insertId } = result[0]
  
        res.status(200).send({ insertId });
    } catch (error) {
        next (error)
    }
};

const postNewProductCategory = async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();
  
        const sqlPostProductCategory = `INSERT INTO product_categories SET
                                        product_id = ${req.params.productId},
                                        category_id = ${req.body.category_id};`;
  
        connection.query(sqlPostProductCategory);
        connection.release();
  
        res.status(200).send("Successfully added");
    } catch (error) {
        next (error)
    }
};

const multerUpload = uploadProduct.single('photo');
const postPhoto = async (req, res, next) => {
  try {
      const connection = await pool.promise().getConnection();

      const sqlPostPhoto = `UPDATE products SET product_image_name = ? WHERE product_id = ?;`;
      const dataPostPhoto = [req.file.filename, req.params.productId]

      connection.query(sqlPostPhoto, dataPostPhoto);
      connection.release();

      res.status(200).send("Proof successfully uploaded");
  } catch (error) {
    next (error)
  }
};

router.post('/new', postNewProducts);
router.post('/category/:productId', postNewProductCategory);
router.post('/photo/:productId', multerUpload, postPhoto);

module.exports = router;
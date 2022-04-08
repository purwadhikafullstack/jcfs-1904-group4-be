const router = require("express").Router();
const pool = require("../../config/database");

const getUserAddressRouter = router.get('/:user_id', async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetProductsById = 'SELECT * FROM address_users WHERE user_id = ?;';
      const sqlDataProductsById = req.params.user_id;
  
      const result = await connection.query(sqlGetProductsById, sqlDataProductsById);
      connection.release();
  
      const address = result[0]
      
      res.status(200).send({ address })
    } catch (error) {
      next(error);
    }
  });

  module.exports = { getUserAddressRouter };
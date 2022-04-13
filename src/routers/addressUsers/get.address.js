const router = require("express").Router();
const pool = require("../../config/database");

const getUserAddress = async (req, res, next) => {
    try {
      const connection = await pool.promise().getConnection();
  
      const sqlGetUserAddress = 'SELECT * FROM address_users WHERE user_id = ?';
      const dataGetUserAddress = req.params.user_id;
  
      const result = await connection.query(sqlGetUserAddress, dataGetUserAddress);
      connection.release();
  
      const address = result[0]
      
      res.status(200).send({ address })
    } catch (error) {
      next(error);
    }
  };

const getDefaultAddress = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetDefaultAddress = 'SELECT * FROM address_users WHERE user_id = ? AND is_default = 1';
    const dataGetDefaultAddress = req.params.user_id;

    const result = await connection.query(sqlGetDefaultAddress, dataGetDefaultAddress);
    connection.release();

    const address = result[0]
    
    res.status(200).send({ address })
  } catch (error) {
    next(error);
  }
};

const getChosenAddress = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlGetChosenAddress = `SELECT * FROM address_users WHERE address_id = ${req.params.address_id}`;

    const result = await connection.query(sqlGetChosenAddress);
    connection.release();

    console.log(result[0])
    const address = result[0]
    
    res.status(200).send({ address })
  } catch (error) {
    next(error);
  }
};

router.get('/:user_id', getUserAddress);
router.get('/default/:user_id', getDefaultAddress);
router.get('/chosen/:address_id', getChosenAddress);

module.exports = router;
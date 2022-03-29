const router = require('express').Router();
const pool = require('../../config/database');
const { sign } = require('../../services/token');

const postLoginUser = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    await connection.beginTransaction();

    try {
      const connection = await pool.promise().getConnection();
      const { username, password } = req.body;

      const sqlLoginUser = `SELECT user_id, username, full_name, email, role, is_verified FROM users WHERE username = ?;`;
      const sqlDataUser = username;

      const result = await connection.query(sqlLoginUser, sqlDataUser);
      connection.release();

      const user = result[0];

      if (!user) return res.status(404).send({ message: 'User not found' });

      // const compareResult = bcrypt.compareSync(password, user.password);

      // if (!compareResult) return res.status(401).send({ message: 'Wrong password' });

      if (!user[0].is_verified) return res.status(401).send({ message: 'Please verify your account' });

      const token = sign({ id: user[0].user_id });
      console.log(user);

      res.status(200).send({ user, token });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

router.post('/login', postLoginUser);

module.exports = router;

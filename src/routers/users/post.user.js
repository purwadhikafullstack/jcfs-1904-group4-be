const router = require('express').Router();
const upload = require('../../services/upload/')
const pool = require('../../config/database');
const { sign } = require('../../services/token');

const postLoginUserRouter = router.post('/login', async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    const { username, password } = req.body;

    const sqlLoginUser = `SELECT user_id, username, full_name, email, role, is_verified, warehouse_id FROM users WHERE username = ?;`;
    const sqlDataUser = username;

    const result = await connection.query(sqlLoginUser, sqlDataUser);
    connection.release();

    const user = result[0];

    if (!user) return res.status(404).send({ message: 'User not found' });

    // const compareResult = bcrypt.compareSync(password, user.password);

    // if (!compareResult) return res.status(401).send({ message: 'Wrong password' });

    if (!user[0]?.is_verified) return res.status(401).send({ message: 'Please verify your account' });

    const token = sign({ id: user[0].user_id });
    // user:[{id: 1, username: user1}]
    res.status(200).send({ user: user[0], token });
  } catch (error) {
    next(error);
  }
});

// const postRegisterUser = router.post('/register', async (req, res, next) => {});

// Upload Photo
const multerUpload = upload.single('photo');
const postUserPhotoRouter = router.post(
  '/upload',
  multerUpload, 
  async (req, res, next) => {
  // Simpan nama photo (username-photo.png)
  res.send('Periksa console log')
});


module.exports = { postUserPhotoRouter, postLoginUserRouter};

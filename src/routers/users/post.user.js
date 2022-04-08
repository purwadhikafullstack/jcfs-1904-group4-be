require('dotenv').config();
const router = require('express').Router();
const pool = require('../../config/database');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { sign, verify } = require('../../services/token');
const sendEmail = require('../../services/email');

const postLoginUser = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();
    const { username, password } = req.body;

    const sqlLoginUser = `SELECT user_id, username, full_name, email, password, role, is_verified, warehouse_id FROM users WHERE username = ?;`;
    const sqlDataUser = username;

    const result = await connection.query(sqlLoginUser, sqlDataUser);
    connection.release();

    const user = result[0];

    if (!user) return res.status(404).send({ message: 'User not found' });

    const compareResult = bcrypt.compareSync(password, user[0].password);

    if (!compareResult) return res.status(401).send({ message: 'Wrong password' });

    if (!user[0]?.is_verified) return res.status(401).send({ message: 'Please verify your account' });

    const token = sign({ id: user[0].user_id });
    
    res.status(200).send({ user: user[0], token });
  } catch (error) {
    next(error);
  }
};

const postRegisterUser = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlRegisterUser = `INSERT INTO users SET ?`;
    const sqlDataUser = req.body;

    const isEmail = validator.isEmail(sqlDataUser.email);
    if (!isEmail) return res.status(401).send({ message: 'Format email salah' });

    sqlDataUser.password = bcrypt.hashSync(sqlDataUser.password);

    const resultRegister = await connection.query(sqlRegisterUser, sqlDataUser);
    connection.release();

    const user = resultRegister[0];
    const token = sign({ id: user.insertId });

    sendEmail({
      recipient: sqlDataUser.email,
      subject: 'Verification',
      templateName: 'verification.html',
      data: {
        username: sqlDataUser.username,
        url: `${process.env.API_URL}/users/verify?token=${token}`,
      },
    });

    const sqlRegisterGetUser = `SELECT username, role, is_verified FROM users WHERE username = ?`;
    const sqlDataGetUser = req.body.username;

    const resultGetRegister = await connection.query(sqlRegisterGetUser, sqlDataGetUser);
    connection.release();

    const getUser = resultGetRegister[0];

    res.status(201).send({
      user: {
        user_id: user.insertId,
        username: getUser[0].username,
        role: getUser[0].role,
        is_verified: getUser[0].is_verified,
      },
      message: `Data dengan username : ${req.body.username} berhasil ditambahkan`,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const postForgotPassword = async (req, res, next) => {
  try {
    const connection = await pool.promise().getConnection();

    const sqlForgotPassword = `SELECT user_id FROM users WHERE email = ?;`;
    const sqlDataUser = req.body.email;

    const result = await connection.query(sqlForgotPassword, sqlDataUser);
    connection.release();

    const user = result[0];
    const token = sign({ id: user[0].user_id });

    sendEmail({
      recipient: sqlDataUser,
      subject: 'Forgot Password',
      templateName: 'forgotPassword.html',
      data: {
        email: sqlDataUser,
        url: `${process.env.CLIENT_URL}/reset-password/${token}`,
      },
    });

    res.status(200).send({ user: user[0], token });
  } catch (error) {
    console.log({ error });
  }
};

router.post('/login', postLoginUser);
router.post('/register', postRegisterUser);
router.post('/forgot-password', postForgotPassword);

module.exports = router;

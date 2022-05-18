const router = require("express").Router();
const pool = require("../../config/database");
const auth = require("../../middleware/auth");
const { verify } = require("../../services/token");

const getAllUser = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUsers = `SELECT * FROM users;`;

    const result = await connection.query(sqlGetUsers);
    connection.release();

    const user = result[0];

    res.status(200).send({ user });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserById = `SELECT * FROM users WHERE user_id = ${req.params.user_id};`;

    const result = await connection.query(sqlGetUserById);
    connection.release();

    const user = result[0];

    res.status(200).send({ user });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getVerify = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const verifiedToken = verify(req.query.token);

    const sqlUpdateVerify = `UPDATE users SET is_verified = true WHERE user_id = ?`;

    const dataUpdateVerify = verifiedToken.id;

    const result = await connection.query(sqlUpdateVerify, dataUpdateVerify);
    connection.release();

    res.status(200).send("<h1>Verification Success</h1>");
  } catch (error) {
    connection.release();
    console.log({ error });
  }
};

const getUserPicture = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserProfile = `SELECT profile_image_name FROM users WHERE user_id = ${req.params.user_id}`;

    const result = await connection.query(sqlGetUserProfile);
    connection.release();

    res.status(200).send({ result });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getWarehouseId = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserProfile = `SELECT warehouse_id FROM users WHERE user_id = ${req.params.user_id}`;

    const result = await connection.query(sqlGetUserProfile);
    connection.release();

    const warehouse_id = result[0];

    res.status(200).send({ warehouse_id });
  } catch (error) {
    connection.release();
    next(error);
  }
};

const getUserData = async (req, res, next) => {
  const connection = await pool.promise().getConnection();
  try {
    const sqlGetUserData = `SELECT full_name, email, gender, age FROM users WHERE user_id = ${req.params.user_id}`;

    const result = await connection.query(sqlGetUserData);
    connection.release();

    const user_data = result[0];

    res.status(200).send({ user_data });
  } catch (error) {
    connection.release();
    next(error);
  }
};

router.get("/picture/:user_id", auth, getUserPicture);
router.get("/wh_id/:user_id", getWarehouseId);
router.get("/profile/:user_id", getUserData);
router.get("/get/:user_id", getUserById);
router.get("/getAll", auth, getAllUser);
router.get("/verify", getVerify);

module.exports = router;

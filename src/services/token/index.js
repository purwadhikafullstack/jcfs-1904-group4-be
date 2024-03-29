require('dotenv').config();

const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

const sign = (data) => jwt.sign(data, key);

const verify = (data) => jwt.verify(data, key);

module.exports = { sign, verify };

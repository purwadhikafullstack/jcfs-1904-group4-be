require('dotenv').config();

const jwt = require('jsonwebtoken');
const key = process.env.JWT_KEY;

const sign = (data) => {
  const result = jwt.sign(data, key);
  return result;
};

const verify = (data) => jwt.verify(data, key);

module.exports = { sign, verify };

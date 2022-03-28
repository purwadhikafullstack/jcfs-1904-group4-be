require('dotenv').config();
const mysql2 = require('mysql2');

const { DB_USER, DB_NAME, DB_PASS } = process.env;

const pool = mysql2.createPool({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 50
});

module.exports = pool;

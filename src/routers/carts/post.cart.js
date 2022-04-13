// const router = require("express").Router();
// const pool = require("../../config/database");

// const postNewCart = async (req, res, next) => {
//     try {
//         const connection = await pool.promise().getConnection();

//             const sqlPostUserAddress = "INSERT INTO address_users SET ?;";
//             const dataPostUserAddress = [ req.body ]

//             const result = await connection.query(sqlPostUserAddress, dataPostUserAddress)
//             connection.release();

//             res.status(200).send("Address successfully added")
//         } catch (error) {
//           next (error)
//     }
// };

// router.post('')

// module.exports = router;
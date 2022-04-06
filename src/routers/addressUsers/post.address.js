// const router = require("express").Router();
// const pool = require("../../config/database");

// const postUserAddress = router.post("/add", async (req, res, next) => {
//     try {
//         const connection = await pool.promise().getConnection();
//         await connection.beginTransaction();
    
//         try {
//             const connection = await pool.promise().getConnection();

//             const sqlPostUserAddress = "INSERT INTO address_users SET ?;";
//             const dataPostUserAddress = [ req.user.user_id, req.body ]

//             const result = await connection.query(sqlPostUserAddress, dataPostUserAddress)
//             connection.release();

//             const categories = result[0]

//             res.status(200).send({ categories })
//         } catch (error) {
//           next (error)
//         }
//     } catch (error) {
//       next (error)
//     };
// });
// const router = require("express").Router();
// const pool = require("../../config/database");

// const putUserById = async (req, res, next) => {
//     try {
//         const connection = await pool.promise().getConnection();
//         await connection.beginTransaction();

//         try {
//             const connection = await pool.promise().getConnection();

//             const sqlUpdateUserById = 'update users set ? where id = ?;';
//             const dataUpdateUserById = [req.body, req.params.userId];

//             const result = await connection.query(sqlUpdateUserById, dataUpdateUserById)
//             connection.release();

//             res.status(200).send({ message: "Data has been successfully updated"})
//         } catch (error) {
//             next (error)
//         };
//     } catch (error) {
//         next (error)
//     };
// };

// router.put("/:userId", putUserById);

// module.exports = router;
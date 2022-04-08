const router = require('express').Router();
const pool = require('../../config/database');

const putUserData = router.put('/:user_id', async (req, res, next) => {
    try {
        const connection = await pool.promise().getConnection();

        const sqlPutUserProfile = `UPDATE users SET ? WHERE user_id = ?;`;
        const dataPutUserProfile = [req.body, req.params.user_id]

        connection.query(sqlPutUserProfile, dataPutUserProfile);
        connection.release();
            
        res.status(200).send({ message: "Update was successful" })
        } catch (error) {
            next(error);
        }
});

module.exports = { putUserData };
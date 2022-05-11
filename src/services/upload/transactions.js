const multer = require('multer');
const path = require('path');

const photoDir = path.join(__dirname, '../../../public/transaction');

const storage = multer.diskStorage ({
    // Config destination
    destination: function (req, file, cb) {
      cb(null, photoDir)
    },

    filename: function (req, file, cb) {
        cb(null, `${req.params.user_id}-transaction-${req.params.transaction_id}.jpg`);
    },
  });

  const uploadTransaction = multer({
    storage,
    limits: {
        fileSize: 30000000 // 30 MB (1 MB = 1.000.000 B)
    },
    fileFilter (req, file, cb) {
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        const extname = path.extname(file.originalname);

        if (!allowedExtension.includes(extname))
          return cb(new Error("Please upload under jpg, jpeg or png format"))

        cb (null, true)
    }
  });

  module.exports = uploadTransaction;
const multer = require('multer');
const path = require('path');

const photoDir = path.join(__dirname, '../../../public/photos');

const storage = multer.diskStorage ({
    // Config destination
    destination: function (req, file, cb) {
      cb(null, photoDir)
    },

    filename: function (req, file, cb) {
        req.body
        cb(null, `${req.users.username}-photo.jpg`);
    },
  });

  const upload = multer({
    storage,
    limits: {
        fileSize: 20000000 // 20 MB (1 MB = 1.000.000 B)
    },
    fileFilter (req, file, cb) {
        const allowedExtension = ['.png', '.jpg', '.jpeg'];
        const extname = path.extname(file.originalname);

        if (!allowedExtension.includes(extname))
          return cb(new Error("Please upload under jpg, jpeg or png format"))

        cb (null, true)
    }
  });

  module.exports = upload;
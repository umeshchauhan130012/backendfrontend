const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|pdf|doc|docx|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (!extname || !mimetype) {
      return cb(new Error('Error: Invalid file type'));
    }
    if (req.headers['content-length'] > 2000000) {
      return cb(new Error('Error: File size exceeds 2MB'));
    }
    cb(null, true);
    // if (mimetype && extname) {
    //   return cb(null, true);
    // } else {
    //   cb(new Error('Error: Invalid file type'));
    // }
  }
});

module.exports = upload;

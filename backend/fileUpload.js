const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExtension = path.basename(file.originalname, fileExtension);
    const currentDate = new Date().toISOString().replace(/:/g, '-');
    const uniqueFileName = `${fileNameWithoutExtension}-${currentDate}${fileExtension}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

module.exports = upload;

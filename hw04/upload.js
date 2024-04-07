const multer = require('multer');
const path = require('path');

// 이미지 저장을 위한 multer 설정
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, './public/uploads')); // 파일 저장 경로
  },
  filename: function(req, file, cb) {
    // 파일명 설정 (fieldname + timestamp + extension)
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('images', 2); // 이미지 파일 2개까지 허용

module.exports = upload;
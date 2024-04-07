var express = require('express');
const maria = require('../database/connect/maria')
const upload = require('../upload')
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.render('post')
});

router.post('/', upload, (req, res) => {
  const { author, title, content } = req.body;
  let imagePaths = req.files.map(file => `/uploads/${file.filename}`);

  // 업로드된 이미지가 없는 경우 빈 배열로 초기화
  if (imagePaths.length === 0) imagePaths = [null, null];
  // 하나의 이미지만 업로드된 경우 두 번째 이미지 경로를 null로 설정
  else if (imagePaths.length === 1) imagePaths.push(null);

  const query = 'INSERT INTO posts (user_name, title, content, post_date, image_path1, image_path2) VALUES (?, ?, ?, ?, ?, ?)';
  maria.query(query, [author, title, content, new Date(), imagePaths[0], imagePaths[1]], (error, results) => {
      if (error) {
          console.error("An error occurred: " + error.message);
          return res.status(500).send("Server error");
      }
      res.redirect('/');
  });
});

router.get("/edit/:id",(req,res)=>{
  res.render('editPost');
})

router.post("/edit/:id", upload, (req, res) => {
  const { id } = req.params;
  const { user_name, title, content } = req.body;
  console.log(req.files)
  let imagePaths = req.files.map(file => `/uploads/${file.filename}`);

  // 업로드된 이미지가 없는 경우 기존 이미지 경로 유지 처리가 필요할 수 있음
  if (imagePaths.length === 0) imagePaths = [null, null];
  // 하나의 이미지만 업로드된 경우 두 번째 이미지 경로를 null로 설정
  else if (imagePaths.length === 1) imagePaths.push(null);

  const query = 'UPDATE posts SET user_name = ?, title = ?, content = ?, image_path1 = ?, image_path2 = ? WHERE ID = ?';
  maria.query(query, [user_name, title, content, imagePaths[0], imagePaths[1], id], (error, results) => {
      if (error) return res.status(500).send("Server error");
      res.redirect('/');
  });
});

module.exports = router;

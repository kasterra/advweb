var express = require('express');
const maria = require('../database/connect/maria')
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  const { id } = req.params;
  const query = 'SELECT ID, user_name, title, post_date, content FROM posts WHERE ID = ?';

  maria.query(query,[id], (error,results)=>{
    if(error){
      return res.status(500).send("Server error");
    }
    if(results.length > 0){
      const post = results[0];
      res.render('post',{post})
    }
    else{
      res.status(404).send("NOT FOUND")
    }
  })
});

router.post('/', (req, res) => {
  const { author, title, content } = req.body;

  const query = 'INSERT INTO posts (user_name, title, content,post_date) VALUES (?, ?, ?, ?)';
  maria.query(query, [author, title, content, new Date().toISOString().slice(0,19).replace('T', ' ')], (error, results, fields) => {
      if (error) {
          console.error("An error occurred: " + error.message);
          return res.status(500).send("Server error");
      }
      res.redirect('/');
  });
});

router.get("/edit/:id",(req,res)=>{
  const { id } = req.params;
  const query = 'SELECT * FROM posts WHERE ID = ?';
  maria.query(query, [id], (error, results) => {
      if (error) return res.status(500).send("Server error");
      if (results.length > 0) {
          const post = results[0];
          post.post_date = post.post_date.toLocaleString(); // 날짜 포맷 조정
          res.render('editPost', { post });
      } else {
          res.status(404).send("Post not found");
      }
  });
})

router.post("/edit/:id",(req,res)=>{
  const { id } = req.params;
  const { user_name, title, content } = req.body;
  const query = 'UPDATE posts SET user_name = ?, title = ?, content = ? WHERE ID = ?';
  maria.query(query, [user_name, title, content, id], (error, results) => {
      if (error) return res.status(500).send("Server error");
      res.redirect('/');
  });
})

module.exports = router;

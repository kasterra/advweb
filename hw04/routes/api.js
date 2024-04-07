var express = require('express');
const maria = require('../database/connect/maria')
const upload = require('../upload')
var router = express.Router();

router.get("/posts",(req,res)=>{
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.idx) || 1;
  const offset = (page - 1) * limit;

  const query = `SELECT ID, user_name, title, post_date FROM posts ORDER BY post_date DESC LIMIT ?, ?`;

  maria.query('SELECT COUNT(*) AS totalPosts FROM posts',(error,results)=>{
    if(error){
      res.status(500).send('Sry, 500');
      console.error(error);
    }
    const totalPosts = results[0].totalPosts;
    const totalPages = Math.max(Math.ceil(totalPosts / limit),1);
    maria.query(query, [offset, limit], (error, posts) =>{
      if(error) {
        res.status(500).send('Sry, 500');
        console.error(error);
      }
      res.send({posts,totalPages,currentPage:page})
    })
  })
})

router.get('/post/:id', function(req, res, next) {
  const { id } = req.params;
  const query = 'SELECT ID, user_name, title, post_date, content, image_path1, image_path2 FROM posts WHERE ID = ?';

  maria.query(query,[id], (error,results)=>{
    if(error){
      return res.status(500).send("Server error");
    }
    if(results.length > 0){
      const post = results[0];
      res.send({post})
    }
    else{
      res.status(404).send({})
    }
  })
});

module.exports = router;
var express = require('express');
const maria = require('../database/connect/maria')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
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
    console.log(totalPages)
    maria.query(query, [offset, limit], (error, posts) =>{
      if(error) {
        res.status(500).send('Sry, 500');
        console.error(error);
      }
      res.render('index', {posts,totalPages,currentPage:page})
    })
  })
});

router.get("/new",function(req,res){
  res.render('newPost')
})

module.exports = router;
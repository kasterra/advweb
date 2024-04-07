var express = require('express');
const maria = require('../database/connect/maria')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', )
});

router.get("/new",function(req,res){
  res.render('newPost')
})

module.exports = router;
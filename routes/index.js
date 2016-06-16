var express = require('express');
var router = express.Router();
var elo = require('../elo.js');
var photolist = require('../photolist.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  		photoB: photolist.getRandomPhoto(),
  		photoA: photolist.getRandomPhoto()
  	});
});

module.exports = router;

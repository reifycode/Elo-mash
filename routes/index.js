var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  		photoB: {
  			url: 'http://static4.businessinsider.com/image/55fad9869dd7cc15008bb1ba-480/hillary-clinton-thumbs-up.jpg',
  			rating : '1400',
  			id: '1'
  		},
  		photoA: {
  			url: 'http://media.vanityfair.com/photos/55ddc2f8e8f804624a2ff49c/master/w_800,c_limit/donald-trump-history-hair-ss09.jpg',
  			rating: 1400,
  			id: '2' 
  		}
  	});
});

module.exports = router;

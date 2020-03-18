var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
let query = "SELECT product_id, prodname, productimage, prodprice, status from product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			res.redirect('/');
		}
	res.render('index', {title: 'CozyKitchen', products: result });
 	});

});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT product_id, prodname, productimage, prodprice, status from product"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.redirect('/error');
		}
	res.render('index', {title: 'House of Steel', products: result });
 	});
});

module.exports = router;


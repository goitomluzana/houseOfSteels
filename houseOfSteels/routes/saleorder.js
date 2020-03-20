var express = require('express');
var router = express.Router();

// =============================
// Route to add a new sale order
// =============================

router.get('/addsaleorder', function(req, res, next) {
	res.render('saleorder/addsaleorder');
});


//================================================================
// Route to list all Sale Orders. Notice the view is allsaleorders
// ===============================================================

router.get('/', function(req, res, next) {
  let query = "SELECT order_id, customer_id, saledate from saleorder"; 
    
  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('saleorder/allsaleorders', {saleorders: result });
 	});
});

// ==================================================
// Route to edit one specific saleorder. Notice the view is editsaleorder
// ==================================================
router.get('/:saleorderid/edit', function(req, res, next) {
  let query = "SELECT order_id, customer_id, saledate from saleorder WHERE order_id = " + req.params.saleorderid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('saleorder/editsaleorder', {saleorder: result[0] });
		} 
 	});
});

// ==================================================
// Route to delete one specific sale order. 
// ==================================================
router.get('/:saleorderid/delete', function(req, res, next) {
  let query = "DELETE from saleorder WHERE order_id = " + req.params.saleorderid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/saleorder');
		} 
 	});
});


// ====================================================================
// Route to view one specific sale order. Notice the view is onesaleorder
// ====================================================================

router.get('/:saleorderid', function(req, res, next) {
  let query = "SELECT order_id, customer_id, saledate from saleorder WHERE order_id = " + req.params.saleorderid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('saleorder/onesaleorder', {saleorder: result[0] });
		} 
 	});
});

// ==================================================================
// Route to recieve the added saleorder and save to database
// ================================================================== 

router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO saleorder (customer_id, saledate) VALUES (?, ?)"; 

	db.query(insertquery,[req.body.customer_id,req.body.saledate],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
                res.redirect('/saleorder');
			}
		
		});
});

// ==================================================
// Route to save edited saleorder. 
// ==================================================
router.post('/save', function(req, res, next) {

let updatequery = "UPDATE saleorder set customer_id = ?,saledate = ? WHERE orderd_id = " + req.body.orderd_id; 

db.query(updatequery,[req.body.customer_id,req.body.saledate],(err, result) => {
    if (err) {
            console.log(err);
            res.render('error');
			} else {
res.redirect('/saleorder');
			}
		});
});

module.exports = router;
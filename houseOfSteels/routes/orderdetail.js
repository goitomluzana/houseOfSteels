var express = require('express');
var router = express.Router();

// ====================================
// Route to add a new order detail
// =====================================

router.get('/addorderdetail', function(req, res, next) {
	res.render('orderdetail/addorderdetail');
});

// ==================================================
// Route to edit one specific orderdetail. Notice the view is editorderdetail
// ==================================================
router.get('/:orderdetailid/edit', function(req, res, next) {
  let query = "SELECT orderdetail_id, order_id, product_id, prodqty, saleprice from orderdetail WHERE orderdetail_id = " + req.params.orderdetailid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('orderdetail/editorderdetail', {orderdetail: result[0] });
		} 
 	});
});


// ==================================================================
// Route to list all Order Details. Notice the view is allorderdetail
// ==================================================================

router.get('/', function(req, res, next) {
  let query = "SELECT product_id, orderdetail_id, prodqty, saleprice from orderdetail"; 
    
  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('orderdetail/allorderdetails', {orderdetails: result });
 	});
}); 

// ==================================================
// Route to delete one specific order detail. 
// ==================================================
router.get('/:orderdetailid/delete', function(req, res, next) {
  let query = "DELETE from orderdetail WHERE orderdetail_id = " + req.params.orderdetailid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/orderdetail');
		} 
 	});
});

// ====================================================================
// Route to view one specific order detail. Notice the view is oneorderdetail
// ====================================================================

router.get('/:orderdetailid', function(req, res, next) {
  let query = "SELECT orderdetail_id, order_id, product_id, prodqty, saleprice from orderdetail WHERE orderdetail_id = " + req.params.orderdetailid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('orderdetail/oneorderdetail', {orderdetail: result[0] });
		} 
 	});
});


// ==================================================================
// Route to recieve the added order detail and save to database
// ================================================================== 

router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO orderdetail (order_id, product_id, prodqty, saleprice) VALUES (?, ?, ?, ?)"; 

	db.query(insertquery,[req.body.order_id,req.body.product_id,req.body.prodqty,req.body.saleprice],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
                res.redirect('/orderdetail');
			}
		
		});
});

// ==================================================
// Route to save edited orderdetail. 
// ==================================================
router.post('/save', function(req, res, next) {

let updatequery = "UPDATE orderdetail set order_id = ?,product_id = ?, prodqty = ?, saleprice = ? WHERE orderdetail_id = " + req.body.orderdetail_id; 

db.query(updatequery,[req.body.order_id,req.body.product_id,req.body.prodqty,req.body.saleprice],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
res.redirect('/orderdetail');
			}
		});
});

module.exports = router;
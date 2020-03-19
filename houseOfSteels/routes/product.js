var express = require('express');
var router = express.Router();

// =============================
// Route to add a new product
// =============================

router.get('/addprod', function(req, res, next) {
	res.render('product/addproduct');
});

// ==================================================
// Route to edit one specific product. Notice the view is editproduct
// ==================================================
router.get('/:prodid/edit', function(req, res, next) {
  let query = "SELECT product_id, prodname, productimage, prodtype, proddescribtion, prodprice, status, quantityinstock, supplier_id from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('product/editproduct', {product: result[0] });
		} 
 	});
});


// =======================================================
// Route to list all products. Notice the view is allprods
// ========================================================

router.get('/', function(req, res, next) {
  let query = "SELECT product_id, prodname, productimage, prodtype, proddescribtion, prodprice, status, quantityinstock, supplier_id from product"; 
    
  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('product/allprods', {products: result });
 	});
});


// ==================================================
// Route to delete one specific product. 
// ==================================================
router.get('/:prodid/delete', function(req, res, next) {
  let query = "DELETE from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/product');
		} 
 	});
});


// ==================================================================
// Route to view one specific product. Notice the view is oneproduct
// ==================================================================

router.get('/:prodid', function(req, res, next) {
  let query = "SELECT product_id, prodname, productimage, prodtype, proddescribtion, prodprice, status, quantityinstock, supplier_id from product WHERE product_id = " + req.params.prodid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('product/oneproduct', {product: result[0] });
		} 
 	});
});

// ==================================================================
// Route to recieve the added product user input and save to database
// ================================================================== 

router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO product (prodname, productimage, prodtype, proddescribtion, prodprice, status, quantityinstock, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"; 

	db.query(insertquery,[req.body.prodname,req.body.productimage,req.body.prodtype,req.body.proddescribtion,req.body.prodprice, req.body.status, req.body.quantityinstock, req.body.supplier_id],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
                res.redirect('/product');
			}
		
		});
});

// ==================================================
// Route to save edited product. 
// ==================================================
router.post('/save', function(req, res, next) {

let updatequery = "UPDATE product set prodname = ?,productimage = ?, supplier_id = ?, prodtype = ?, proddescribtion = ?, status = ?, prodprice = ?, quantityinstock = ? WHERE product_id = " + req.body.product_id; 

db.query(updatequery,[req.body.prodname,req.body.productimage,req.body.supplier_id,req.body.prodtype,req.body.proddescribtion, req.body.status, req.body.prodprice, req.body.quantityinstock],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
res.redirect('/product');
			}
		});
});

module.exports = router;

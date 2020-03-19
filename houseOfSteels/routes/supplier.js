var express = require('express');
var router = express.Router();


// =============================
// Route to add a new supplier
// =============================

router.get('/addsupplier', function(req, res, next) {
	res.render('supplier/addsupplier');
});


// ==================================================
// Route to edit one specific supplier. Notice the view is editsupplier
// ==================================================

router.get('/:supplierid/edit', function(req, res, next) {
  let query = "SELECT supplier_id, companyname, phone, website from supplier WHERE supplier_id = " + req.params.supplierid; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('supplier/editsupplier', {supplier: result[0] });
		} 
 	});
});


// ==================================================
// Route to list all Suppliers. Notice the view is allsuppliers
// ==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT supplier_id, companyname, phone, website from supplier"; 
    
  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('supplier/allsuppliers', {suppliers: result });
 	});
});

// ==================================================
// Route to delete one specific supplier. 
// ==================================================
router.get('/:supplierid/delete', function(req, res, next) {
  let query = "DELETE from supplier WHERE supplier_id = " + req.params.supplierid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.redirect('/supplier');
		} 
 	});
});


// ====================================================================
// Route to view one specific supplier. Notice the view is onesupplier
// ====================================================================

router.get('/:supplierid', function(req, res, next) {
  let query = "SELECT supplier_id, companyname, phone, website from supplier WHERE supplier_id = " + req.params.supplierid ; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('supplier/onesupplier', {supplier: result[0] });
		} 
 	});
});

// ==================================================================
// Route to recieve the added product user input and save to database
// ================================================================== 

router.post('/', function(req, res, next) {

let insertquery = "INSERT INTO supplier (companyname, phone, website) VALUES (?, ?, ?)"; 

	db.query(insertquery,[req.body.companyname,req.body.phone,req.body.website],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
                res.redirect('/supplier');
			}
		
		});
});

// ==================================================
// Route to save edited supplier. 
// ==================================================
router.post('/save', function(req, res, next) {

let updatequery = "UPDATE supplier set companyname = ?,phone = ?, website = ? WHERE supplier_id = " + req.body.supplier_id; 

db.query(updatequery,[req.body.companyname,req.body.phone,req.body.website],(err, result) => {
	if (err) {
			console.log(err);
			res.render('error');
			} else {
res.redirect('/supplier');
			}
		});
});

module.exports = router;
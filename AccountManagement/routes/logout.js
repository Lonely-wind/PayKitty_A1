var express = require('express');
var router = express.Router();
var  client = require('../database');
var Transaction = require('../models/transaction');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //req.session.error=null;
    //req.session.destroy();
/*
	Transaction.GetApi('/newlogout', req, 5002, function (data) {
		console.log("-------------send a session out-----------");
		console.log(data);
	});
	*/

	req.session.user=null;
	//req.cookies.kitty=null;
	res.clearCookie('kitty');
	res.clearCookie('kittyname');
	res.clearCookie('kittytype');
    res.redirect('/login');
});

module.exports = router;

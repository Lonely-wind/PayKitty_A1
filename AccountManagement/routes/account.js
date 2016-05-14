var express = require('express');
var router = express.Router();

var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
	var nowID = '123';
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		//console.log('****************');
		//console.log(user.AccountID);
		res.render('account_management', user);
	});

  	//res.render('account_management', { realname: '朱高工' });
});


router.post('/userInfoAPI', function(req, res, next) {
	
	//console.log("here");
	console.log(req.body.accountID);
	var nowID = req.body.accountID;
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 

		res.render('userInfoAPI', {data: JSON.stringify(user)});
	});


});

module.exports = router;

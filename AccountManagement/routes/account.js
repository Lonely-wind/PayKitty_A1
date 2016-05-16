var express = require('express');
var router = express.Router();

var User = require('../models/user');

var trade_data = [
  {num: 1, date: '2016.3.27', seller: '厦门航空', money: -729, state: '交易成功'},
  {num: 2, date: '2016.3.26', seller: '饿了么', money: -66, state: '交易成功'},
  {num: 3, date: '2016.3.21', seller: 'YunlianHotel', money: -594, state: '已付款'},
];


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
		res.render('account_management', {title: 'account_management', user: user, trade_data: trade_data });
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

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
	console.log("-----------------test---------------");
	console.log(req.session.user);
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		res.render('account_management', {user:user, trade_data:trade_data});
	});
});

router.get('/info', function(req, res, next) {
	var nowID = req.session.user;
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		//console.log("---------------account_info---------------");
		//console.log(user);
		res.render('account_info', user);
	});
});

router.post('/info', function(req, res, next) {
	var nowID = req.session.user;
	console.log("----------get user info change------------");
	console.log(req.body);
	if (req.body.submitBtn == 'recharge'){
		User.addMoney(nowID,req.body.amount);
	}
	else if (req.body.submitBtn == 'transfer') {
		User.subMoney(nowID,req.body.amount);
	}
	else{
		User.setInfo(nowID,req.body, function (err,result){
			/*
			console.log("---------err--------------");
			console.log(err);
			console.log("---------result--------------");
			console.log(result);
			*/
			if (err) {
				console.log(err);
			}
		});
	}
	res.redirect('info');
});


router.get('/transaction', function(req, res, next) {
	var nowID = req.session.user;
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		//console.log('****************');
		//console.log(user.AccountID);
		res.render('account_transaction', trade_data );
	});

});

router.get('/delete', function(req, res, next) {
	var nowID = req.session.user;
	User.delAccount(nowID);
	res.redirect('/login');
});





router.post('/userInfoAPI', function(req, res, next) {
	
	console.log("here");
	console.log(req.body.accountID);
	console.log(req.body);
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

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Transaction = require('../models/transaction');


/* GET home page. */

router.get('/', function(req, res, next) {
	var nowID = '123';
	var trade_data = [
		{num: 1, date: '2016-3-27', seller: '厦门航空', money: -729, state: '交易成功'},
		{num: 2, date: '2016-3-26', seller: '饿了么', money: -66, state: '交易成功'},
		{num: 3, date: '2016-3-21', seller: 'YunlianHotel', money: -594, state: '已付款'},
	];
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

router.post('/', function(req, res, next) {
	console.log("----------get user info change ------------");
	console.log(req.body);

  	//res.render('account_management', { realname: '朱高工' });
});

router.get('/info', function(req, res, next) {
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login'); 
	}
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
		User.getClickedMessage(req.session.user, "/info", function (err, messages) {
			//console.log(JSON.stringify(user));
			//console.log(JSON.stringify(user).replace(/\}\s*$/g,""));
			//先把jason转化为字符串，然后去除}，合并json数据
			console.log(messages);
			user = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages}).replace(/^\s*\{/g,""));
			res.render('account_info', user);		
		});		
	});
});

router.post('/info', function(req, res, next) {
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login'); 
	}
	var nowID = req.session.user;
	console.log("----------get user info change------------");
	console.log(req.body);
	if (req.body.submitBtn == 'recharge'){
		User.addMoney(nowID,req.body.amount);
	}
	else if (req.body.bankaccount) {
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


router.route('/transaction')
.post(function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login'); 
	}
	var post_data = {
		accountID:req.session.user,
	}
	
	User.getClickedMessage(req.session.user, "/transaction", function (err, messages) {
		User.getInfo(req.session.user, function (err, user) { 
			if (!user) 
			  err = 'No such an account.'; 
			if (err) { 
			  req.flash('error', err); 
			  return res.redirect('/reg'); 
			}

			Transaction.GetApi('/account/myTest', post_data, 5001, function (data) {
				if(user.Type == "0"){
					var trade_data = '';
					var order_constraints= {
						start_time:	new  Date(req.body.start_time.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/")),
						end_time:	new  Date(req.body.end_time.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/")),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						seller:		req.body.seller,           
					}
					if(req.body.start_time == ""){
						order_constraints.start_time = new Date("1970/1/1");
					}
					if(req.body.end_time == ""){
						order_constraints.end_time = new Date();
					}
					Transaction.Search(data, order_constraints, function(trade_data){
						res.render('account_transaction_user', {title: '交易记录', trade_data: trade_data, search: order_constraints, AccountName: user.AccountName, message: messages });
					});
				}
				else{
					var trade_data = '';
					var order_constraints= {
						start_time:	new  Date(req.body.start_time.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/")),
						end_time:	new  Date(req.body.end_time.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/")),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						goods:		req.body.goods,           
					}
					if(req.body.start_time == ""){
						order_constraints.start_time = new Date("1970/1/1");
					}
					if(req.body.end_time == ""){
						order_constraints.end_time = new Date();
					}
					Transaction.Search(data, order_constraints, function(trade_data){
						res.render('account_transaction_seller', {title: '交易记录', trade_data: trade_data, search: order_constraints, AccountName: user.AccountName, message: messages });
					});
				}
			});
		});
	});

})
.get(function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login');
	}
	var post_data = {
		accountID:req.session.user,
	}
	
	User.getClickedMessage(req.session.user, "/transaction", function (err, messages) {
		User.getInfo(req.session.user, function (err, user) { 
			if (!user) 
			  err = 'No such an account.'; 
			if (err) {
			  req.flash('error', err); 
			  return res.redirect('/reg'); 
			}

			Transaction.GetApi('/account/myTest', post_data, 5001, function (data) {
				if(user.Type == "0"){
					var order_constraints= {
						start_time:	new  Date("1970/1/1"),
						end_time:	new  Date(),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						seller:		req.body.seller,           
					}
					res.render('account_transaction_user', {title: '交易记录', trade_data: data, search: order_constraints, AccountName: user.AccountName, message: messages });
				}
				else{
					var order_constraints= {
						start_time:	new  Date("1970/1/1"),
						end_time:	new  Date(),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						goods:		req.body.goods,           
					}
					res.render('account_transaction_seller', {title: '交易记录', trade_data: data, search: order_constraints, AccountName: user.AccountName, message: messages });
				}
			});
		});
	});

});


router.get('/:backUrl/message/clear', function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login');
	}
	User.clickAllMessage(req.session.user);
	return res.redirect('/account/' + req.params.backUrl);
});

router.get('/:backUrl/message/:MessageID/click', function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login');
	}
	User.clickMessage(req.session.user, req.params.MessageID);
	return res.redirect('/account/' + req.params.backUrl);
});

router.get('/message', function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login');
	}
	User.getClickedMessage(req.session.user, "/message", function (err, messages) {
		User.getTotalMessage(req.session.user, function (err, messageTotal) {
			User.getInfo(req.session.user, function (err, user) { 
				if (!user) 
			  	err = 'No such an account.'; 
				if (err) {
			  	req.flash('error', err); 
			  	return res.redirect('/reg'); 
				}
			res.render('account_message', {title: '消息记录', message_data: messageTotal, AccountName: user.AccountName, message: messages });
			});
		});
	});
});





router.post('/myTest', function(req, res, next) {
	console.log(req.body.accountID);
	var trade_data = [
		{num: 1, date: '2016-3-27', seller: '厦门航空', money: -729, state: '交易成功', SellerPhone: "15700071111"},
		{num: 2, date: '2016-3-26', seller: '饿了么', money: -66, state: '交易成功', SellerPhone: "15700072222"},
		{num: 3, date: '2016-3-21', seller: 'YunlianHotel', money: -594, state: '已付款', SellerPhone: "15700073333"},
	];
	var trade_data1 = [
		{num: 1, date: '2016-3-27', goods: '飞机票', number:"1", money: 729, state: '交易成功'},
		{num: 2, date: '2016-3-26', goods: '动车票', number:"1", money: 66, state: '交易成功'},
		{num: 3, date: '2016-3-21', goods: '火车票', number:"1", money: 594, state: '已付款'},
	];
	User.getInfo(req.body.accountID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg');
		}
		if(user.Type == "0"){
			res.send(JSON.stringify(trade_data));
		}
		else{
			res.send(JSON.stringify(trade_data1));
		}
	});
});

router.post('/userMessageAPI', function(req, res, next) {
	var result, message, sender, accountID;
	if(!("accountID" in req.body) || req.body.accountID == ""){
		result = {
			result : 0,
			resultMessage : "You must have a accountID!"
		}
		return res.send(JSON.stringify(result));
	}
	else{
		accountID = req.body.accountID;
	}
	if(!("sender" in req.body) || req.body.sender == ""){
		sender = "default";
	}
	else{
		sender = req.body.sender;
	}
	if(!("message" in req.body) || req.body.message == ""){
		message = "由于未知原因，消息没有接受到";
	}
	else{
		message = req.body.message;
	}
	
	var data = {
		message : message,
		sender : sender,
		accountID : accountID,
	}
	User.insertMessage(data, function(err){
		if(err){
			result = {
				result : 0,
				resultMessage : "You must have a accountID!"
			}
		}
		else{
			result = {
				result : 1,
				resultMessage : ""
			}
		}
		res.send(JSON.stringify(result));
	});
});

router.get('/test/userMessageAPI', function(req, res, next) {
	//检测userMessageAPI是否有用
	res.render('test_userMessageAPI');
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

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var GetApi = require('../models/getapi');


/* GET home page. */

router.get('/exit', function(req, res, next) {
	delete req.session.user;
	res.redirect('/login');
});

router.get('/', function(req, res, next) {
	var nowID = '123';
	var trade_data = [
		{num: 1, date: '2016-3-27', seller: '厦门航空', money: -729, state: '交易成功'},
		{num: 2, date: '2016-3-26', seller: '饿了么', money: -66, state: '交易成功'},
		{num: 3, date: '2016-3-21', seller: 'YunlianHotel', money: -594, state: '已付款'},
	];
	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		res.render('account_management', {'user':user, 'trade_data':trade_data});
	});
});

router.post('/', function(req, res, next) {
	console.log("----------get user info change ------------");
	console.log(req.body);

  	//res.render('account_management', { realname: '朱高工' });
});

router.get('/info', function(req, res, next) {
	var nowID = '123';

	User.getInfo(nowID, function (err, user) { 
		if (!user) 
		  err = 'No such an account.'; 
		if (err) { 
		  req.flash('error', err); 
		  return res.redirect('/reg'); 
		} 
		console.log("---------------account_info---------------");
		console.log(user);
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


router.route('/transaction')
.post(function(req, res, next){
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login'); 
	}
	var post_data = {
		accountID:req.session.user,
	}
	
	GetApi('/account/myTest2', post_data,function (message) {
		
		User.getInfo(req.session.user, function (err, user) { 
			if (!user) 
			  err = 'No such an account.'; 
			if (err) { 
			  req.flash('error', err); 
			  return res.redirect('/reg'); 
			}

			GetApi('/account/myTest', post_data,function (data) {
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
					var trade_data = new Array();
					for (var i in data){
						var time = new  Date(data[i].date.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/"));
						if(time < order_constraints.start_time || time > order_constraints.end_time){
							continue;
						}
						if(req.body.start_time != "" && req.body.end_time != "" && (parseFloat(data[i].money) < parseFloat(order_constraints.low_money) || parseFloat(data[i].money) > parseFloat(order_constraints.upper_money))){
							continue;
						}
						if(order_constraints.state != "全部状态" && order_constraints.state != data[i].state){
							continue;
						}
						if(order_constraints.seller != "" && order_constraints.seller != data[i].seller){
							continue;
						}
						trade_data.push(data[i]);
					}
					res.render('account_transaction_user', {title: '交易记录', trade_data: trade_data, search: order_constraints, AccountName: user.AccountName, message: message });
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
					var trade_data = new Array();
					for (var i in data){
						var time = new  Date(data[i].date.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/"));
						if(time < order_constraints.start_time || time > order_constraints.end_time){
							continue;
						}
						if(req.body.start_time != "" && req.body.end_time != "" && (parseFloat(data[i].money) < parseFloat(order_constraints.low_money) || parseFloat(data[i].money) > parseFloat(order_constraints.upper_money))){
							continue;
						}
						if(order_constraints.state != "全部状态" && order_constraints.state != data[i].state){
							continue;
						}
						if(order_constraints.goods != "" && order_constraints.goods != data[i].goods){
							continue;
						}
						trade_data.push(data[i]);
					}
					res.render('account_transaction_seller', {title: '交易记录', trade_data: trade_data, search: order_constraints, AccountName: user.AccountName, message: message });
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
	
	GetApi('/account/myTest2', post_data,function (message) {
		
		User.getInfo(req.session.user, function (err, user) { 
			if (!user) 
			  err = 'No such an account.'; 
			if (err) { 
			  req.flash('error', err); 
			  return res.redirect('/reg'); 
			}

			GetApi('/account/myTest', post_data,function (data) {
				if(user.Type == "0"){
					var order_constraints= {
						start_time:	new  Date("1970/1/1"),
						end_time:	new  Date(),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						seller:		req.body.seller,           
					}
					res.render('account_transaction_user', {title: '交易记录', trade_data: data, search: order_constraints, AccountName: user.AccountName, message: message });
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
					res.render('account_transaction_seller', {title: '交易记录', trade_data: data, search: order_constraints, AccountName: user.AccountName, message: message });
				}
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
router.post('/myTest2', function(req, res, next) {
	console.log(req.body.accountID);
	var trade_data = [
		{message: "您购买的物品已发货", time: "3 mins ago", href: "#"},
		{message: "您购买的物品未发货", time: "3 mins ago", href: "#"},
		{message: "您购买的物品已到", time: "3 mins ago", href: "#"},
	];
	res.send(JSON.stringify(trade_data));
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
		res.send(JSON.stringify(user));
//		res.render('userInfoAPI', {data: JSON.stringify(user)});
	});


});

module.exports = router;

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Dealer = require('../models/dealer');
var Transaction = require('../models/transaction');


/* GET home page. */

router.get('/', function(req, res, next) {
	var post_data = { accountID : '224'};
	Transaction.GetApi('/A1/API/getDealerInfo', post_data, 5001, function (data) {
		console.log("-------------Test GET API-----------");
		console.log(data);
	});
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
	/*
	Transaction.GetApi('/newlogin', req, 5002, function (data) {
		console.log("-------------send a session-----------");
		console.log(data);
	});
	*/
	console.log('===================================');
	console.log(req.session);
	console.log('===================================');
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
			req.session.name = user.AccountName.toString();
			//console.log(user.AccountName);
			render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: '', user_balance: ''}).replace(/^\s*\{/g,""));
			res.render('account_info', render_data);		
		});		
	});
});

router.post('/info', function(req, res, next) {
	console.log(req.body);
	if(!req.session.user){
		console.log('No logining!');
		return res.redirect('/login'); 
	}
	var nowID = req.session.user;
	//console.log("----------get user info change------------");
	//console.log(req.body);
	if ('bankpasswd' in req.body){
		User.addMoney(nowID,req.body.amount,function(err,result){

		});
		res.redirect('info');
	}
	else if (req.body.bankaccount) {
		console.log("ssss--------sssssss");
		User.getUserByPID(req.body.bankaccount, function(err, username){
			if (err) {
				console.log(err);
			}
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
						if(!username){
							username = "";
						}
						var win_message = ".click();"
						var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : username, win_message: win_message, user_balance: req.body.amount}).replace(/^\s*\{/g,""));
						//console.log(JSON.stringify({win_message:win_message}));
						//render_data.message = win_message;
						//console.log(render_data);
						res.render('account_info', render_data);	
				});		
			});

		});
	}
	else if(req.body.button_type == "10" || req.body.button_type == "20" || req.body.button_type == "30" || req.body.button_type == "40"){
		if (req.body.button_type == "10"){
			User.deletePID("Payment1", req.body.pid_num, req.body.account_id, function(err) {
				User.getInfo(nowID, function (err, user) { 
					if (!user) 
					  err = 'No such an account.'; 
					if (err) { 
					  req.flash('error', err); 
					  return res.redirect('/reg'); 
					} 
					console.log("---------------account_info---------------");
					//console.log(user);
					User.getClickedMessage(req.session.user, "/info", function (err, messages) {
								var win_message = "";
								var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
								res.render('account_info', render_data);	
					});
				});		
			});
		}
		else if(req.body.button_type == "20"){
			User.deletePID("Payment2", req.body.pid_num, req.body.account_id, function(err) {
				User.getInfo(nowID, function (err, user) { 
					if (!user) 
					  err = 'No such an account.'; 
					if (err) { 
					  req.flash('error', err); 
					  return res.redirect('/reg'); 
					} 
					console.log("---------------account_info---------------");
					//console.log(user);
					User.getClickedMessage(req.session.user, "/info", function (err, messages) {
								var win_message = "";
								var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
								res.render('account_info', render_data);	
					});
				});		
			});

		}
		else if(req.body.button_type == "30"){
			User.deletePID("Payment3", req.body.pid_num, req.body.account_id, function(err) {
				User.getInfo(nowID, function (err, user) { 
					if (!user) 
					  err = 'No such an account.'; 
					if (err) { 
					  req.flash('error', err); 
					  return res.redirect('/reg'); 
					} 
					console.log("---------------account_info---------------");
					//console.log(user);
					User.getClickedMessage(req.session.user, "/info", function (err, messages) {
								var win_message = "";
								var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
								res.render('account_info', render_data);	
					});
				});		
			});		
		}
		else{
			User.deletePID("Payment4", req.body.pid_num, req.body.account_id, function(err) {
				User.getInfo(nowID, function (err, user) { 
					if (!user) 
					  err = 'No such an account.'; 
					if (err) { 
					  req.flash('error', err); 
					  return res.redirect('/reg'); 
					} 
					console.log("---------------account_info---------------");
					//console.log(user);
					User.getClickedMessage(req.session.user, "/info", function (err, messages) {
								var win_message = "";
								var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
								res.render('account_info', render_data);	
					});
				});		
			});

		}
	}
	else if(req.body.pid_num111){
			//console(" =.=" + req.body.button_type);
			User.tranSubmit(req.body.pid_num111, req.body.button_type111, req.body.account_id111, function(err) {
				User.getInfo(nowID, function (err, user) { 
					if (!user) 
					  err = 'No such an account.'; 
					if (err) { 
					  req.flash('error', err); 
					  return res.redirect('/reg'); 
					} 
					console.log("---------------account_info---------------");
					//console.log(user);
					User.getClickedMessage(req.session.user, "/info", function (err, messages) {
								var win_message = "";
								var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
								res.render('account_info', render_data);	
					});
				});		
			});
	}
	else if(req.body.bank_account222){
		//console(" =.=" + req.body.button_type);
		User.addPID(req.body.bank_password222, req.body.bank_account222, req.body.bank_num222, req.session.user, function(err) {
			User.getInfo(nowID, function (err, user) { 
				if (!user) 
				  err = 'No such an account.'; 
				if (err) { 
				  req.flash('error', err); 
				  return res.redirect('/reg'); 
				} 
				console.log("---------------account_info---------------");
				//console.log(user);
				User.getClickedMessage(req.session.user, "/info", function (err, messages) {
							var win_message = "";
							var render_data = JSON.parse(JSON.stringify(user).replace(/\}\s*$/g,"") + "," + JSON.stringify({message : messages, user_pid : '', win_message: win_message, user_balance: ''}).replace(/^\s*\{/g,""));							res.render('account_info', render_data);
							res.render('account_info', render_data);	
				});
			});		
		});
	}
	else{
		User.setInfo(nowID,req.body, function (err,result){
			if (err) {
				console.log(err);
			}
		});
		res.redirect('info');
	}
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

			Transaction.RealGetApi('http://121.42.175.1/a2/api/getallorder?userID=' + req.session.user, 80, function (data) {
				data = data.orderDetailList;
				for(var i in data){
					data[i].orderTime = new Date(data[i].orderTime).toLocaleDateString();
					if(data[i].orderStatus == "0"){
						data[i].orderStatus = "待付款"
					}
					else if(data[i].orderStatus == "1"){
						data[i].orderStatus = "待商家确认有房/待出票"		
					}
					else if(data[i].orderStatus == "2"){
						data[i].orderStatus = "已确认有房/已出票"
					}
					else if(data[i].orderStatus == "3"){
						data[i].orderStatus = "已乘机/已入住(交易成功)"
					}
					else if(data[i].orderStatus == "4"){
						data[i].orderStatus = "交易关闭"
					}
					else if(data[i].orderStatus == "5"){
						data[i].orderStatus = "待退款"		
					}
					else if(data[i].orderStatus == "6"){
						data[i].orderStatus = "已退款"		
					}
					else if(data[i].orderStatus == "7"){
						data[i].orderStatus = "退款失败"		
					}
				}
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
						console.log({title: '交易记录', trade_data: trade_data, UserID: user.AccountID, search: order_constraints, AccountName: user.AccountName, message: messages });
						res.render('account_transaction_user', {title: '交易记录', trade_data: trade_data, UserID: user.AccountID, search: order_constraints, AccountName: user.AccountName, message: messages });
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
						seller:		"",           
					}
					if(req.body.start_time == ""){
						order_constraints.start_time = new Date("1970/1/1");
					}
					if(req.body.end_time == ""){
						order_constraints.end_time = new Date();
					}
					Transaction.Search(data, order_constraints, function(trade_data){
						Transaction.GetStatistics(data, function(thisMonthTransaction, totalTransaction){
							res.render('account_transaction_seller', {title: '交易记录', trade_data: trade_data, UserID: user.AccountID, search: order_constraints, AccountName: user.AccountName, message: messages, thisMonthTransaction: thisMonthTransaction, totalTransaction: totalTransaction});
						});
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

			Transaction.RealGetApi('http://121.42.175.1/a2/api/getallorder?userID=' + req.session.user, 80, function (data) {
				data = data.orderDetailList;
				for(var i in data){
					data[i].orderTime = new Date(data[i].orderTime).toLocaleDateString();
					if(data[i].orderStatus == "0"){
						data[i].orderStatus = "待付款"
					}
					else if(data[i].orderStatus == "1"){
						data[i].orderStatus = "待商家确认有房/待出票"		
					}
					else if(data[i].orderStatus == "2"){
						data[i].orderStatus = "已确认有房/已出票"
					}
					else if(data[i].orderStatus == "3"){
						data[i].orderStatus = "已乘机/已入住(交易成功)"
					}
					else if(data[i].orderStatus == "4"){
						data[i].orderStatus = "交易关闭"
					}
					else if(data[i].orderStatus == "5"){
						data[i].orderStatus = "待退款"		
					}
					else if(data[i].orderStatus == "6"){
						data[i].orderStatus = "已退款"		
					}
					else if(data[i].orderStatus == "7"){
						data[i].orderStatus = "退款失败"		
					}
				}
				if(user.Type == "0"){
					var order_constraints= {
						start_time:	new  Date("1970/1/1"),
						end_time:	new  Date(),
						low_money:	req.body.low_money,
						upper_money:req.body.upper_money,
						state:		req.body.state,
						seller:		req.body.seller,
					}
					console.log(data);
					res.render('account_transaction_user', {title: '交易记录', trade_data: data, UserID: user.AccountID, search: order_constraints, AccountName: user.AccountName, message: messages });
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
					// test data
					// data = [
					// 	{orderID : "111",orderTime : "2016/6/30",orderAmount : "100.55",orderStatus : "交易成功"},
					// 	{orderID : "112",orderTime : "2016/6/30",orderAmount : "100.55",orderStatus : "交易成功"},
					// 	{orderID : "113",orderTime : "2016/5/30",orderAmount : "100.55",orderStatus : "交易关闭"},
					// 	{orderID : "114",orderTime : "2016/5/30",orderAmount : "100.55",orderStatus : "交易关闭"},
					// 	{orderID : "115",orderTime : "2016/5/30",orderAmount : "100.55",orderStatus : "已退款"},
					// 	{orderID : "116",orderTime : "2016/6/30",orderAmount : "100.55",orderStatus : "已退款"},
					// 	{orderID : "116",orderTime : "2016/5/30",orderAmount : "100.55",orderStatus : "待退款"}						
					// ];
					Transaction.GetStatistics(data, function(thisMonthTransaction, totalTransaction){
						res.render('account_transaction_seller', {title: '交易记录', trade_data: data, UserID: user.AccountID, search: order_constraints, AccountName: user.AccountName, message: messages, thisMonthTransaction: thisMonthTransaction, totalTransaction: totalTransaction});
					});
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
	var result, message, orderID, sender, accountID;
	if(!("accountID" in req.body) || req.body.accountID == ""){
		result = {
			result : 0,
			resultMessage : "You must have an accountID!"
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
	if(!("orderID" in req.body) || req.body.orderID == ""){
		result = {
			result : 0,
			resultMessage : "You must have an orderID!"
		}
		return res.send(JSON.stringify(result));		
	}
	else{
		orderID = req.body.orderID;
	}
	if(!("newState" in req.body) || req.body.newState == ""){
		result = {
			result : 0,
			resultMessage : "You must have a newState!"
		}
		return res.send(JSON.stringify(result));	
	}
	else{
		newState = req.body.newState;
	}
	
	var data = {
		message : "您的订单（" + orderID + "）" + newState,
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
	User.getInfo(nowID,function(err,result,fileds){
		User.delMessage(nowID);
		if(result["Type"]==1){
			Dealer.delAccount(result["DealerNo"]);
		}
		else;
		User.delAccount(nowID);
		res.redirect('/login');
	});
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

		res.send({data: JSON.stringify(user)});
	});


});


router.post("/addmoney",function(req,res,next) {
	//console.log(req.body);
	var nowID = req.body.accountID;
	var amount = req.body.amount;
	var error;
	User.addMoney(nowID,amount,function(err,result){
		
		if(result)
			error="OK";
		else
			error="NO";
		console.log(error);
		result={result:error};
	res.send({data:JSON.stringify(result)});

	});
	//console.log(error);
	


});
router.post("/submoney",function(req,res,next) {
	//console.log(req.body);
	var nowID = req.body.accountID;
	var amount = req.body.amount;
	var error;
	User.getInfo(nowID,function(error,result,field){
		console.log(result["Balance"]);
		var balance=result["Balance"];

		if(amount<balance){
			User.subMoney(nowID,amount,function(err,result){
			console.log(err);
			if(err)
				error="NO";
			else
				error="OK";
			console.log(error);
			show_data={result:error};
			res.send({data:JSON.stringify(show_data)});

	});

		}
		else{
			show_data={result:"NoEnoughMoney"};
			res.send({data:JSON.stringify(show_data)});
		}

	});
	
	//console.log(error);
	


});

module.exports = router;

var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Transaction = require('../models/transaction');
var Dealer = require('../models/dealer');

router.post('/userMessageAPI', function(req, res, next) {
	var result, orderID, sender, accountID, goodKind, goodName, newState;
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
	if(!("goodKind" in req.body) || req.body.accountID == ""){
		result = {
			result : 0,
			resultMessage : "You must have a goodKind!"
		}
		return res.send(JSON.stringify(result));
	}
	else{
		goodKind = req.body.goodKind;
	}
	if(!("goodName" in req.body) || req.body.accountID == ""){
		result = {
			result : 0,
			resultMessage : "You must have a goodName!"
		}
		return res.send(JSON.stringify(result));
	}
	else{
		goodName = req.body.goodName;
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
		if(newState == "0"){
			newState = "待付款"
		}
		else if(newState == "1" && goodKind == "酒店"){
			newState = "待商家确认有房"		
		}
		else if(newState == "1" && goodKind == "机票"){
			newState = "待出票"		
		}
		else if(newState == "2" && goodKind == "酒店"){
			newState = "已确认有房"
		}
		else if(newState == "2" && goodKind == "机票"){
			newState = "已出票"
		}
		else if(newState == "3" && goodKind == "酒店"){
			newState = "已入住"
		}
		else if(newState == "3" && goodKind == "机票"){
			newState = "已乘机"
		}
		else if(newState == "4"){
			newState = "交易关闭"
		}
		else if(newState == "5"){
			newState = "待退款"		
		}
		else if(newState == "6"){
			newState = "已退款"		
		}
		else if(newState == "7"){
			newState = "退款失败"		
		}
	}
	
	var data = {
		message : "您的订单" + orderID + "中的" + goodName + "状态改变为：" + newState,
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


router.post('/getDealerInfo', function(req, res, next) {
    
    console.log("here");
    console.log(req.body.accountID);
    console.log(req.body);
    var nowID = req.body.accountID;
    Dealer.getInfo(nowID, function (err, user) { 
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


router.get('/message/clickedMessage', function(req, res, next){
	console.log("/message/clickedMessage---------");
	console.log(req.query);
	User.getClickedMessage(req.query.accountID, req.query.backUrl, function (err, messages) {
		console.log(messages);
		console.log(messages.length);	
		res.send(JSON.stringify(messages));
	});
});



module.exports = router;

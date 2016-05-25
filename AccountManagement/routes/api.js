var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Transaction = require('../models/transaction');

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

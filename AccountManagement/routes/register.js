var express = require('express');
var router = express.Router();
var  client = require('../database');
var mysql = client.getDbCon();
var  uid = require('../utils/uuid');//用于生成id

var uuid = uid.v4();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title : 'Express'});
});

router.route('/')
.get(function(req, res) {
    res.render('register', { title: '用户注册' });
})
.post(function(req, res) {
    if(req.body['Regrepass']!=req.body['Regpass']){
        return res.redirect('register');
    }

    var result;
    result =  function  save(callback) {
        var sql = "select * from UserAccount where AccountName = '" + req.body.Reguser + "';";
        mysql.query(sql,function(err,results,fields){
        if (err) {
            throw err;
        } else {
            if (results[0] != undefined) {
                //req.flash('error', ' 用户不存在'); 
                callback(err,results[0],fields);
            }
        }
        })
    };

    if (result != undefined) {
        return res.redirect('register');
    }

    result =  function  save(callback) {
        var sql = "select * from UserAccount where Email = '" + req.body.Regemail + "';";
        mysql.query(sql,function(err,results,fields){
        if (err) {
            throw err;
        } else {
            if (results[0] != undefined) {
                //req.flash('error', ' 用户不存在'); 
                callback(err,results[0],fields);
            }
        }
        })
    };

    if (result != undefined) {
        return res.redirect('register');
    }

    result =  function  save(callback) {
        var sql = "select * from UserAccount where Phone = '" + req.body.Regmobi + "';";
        mysql.query(sql,function(err,results,fields){
        if (err) {
            throw err;
        } else {
            if (results[0] != undefined) {
                //req.flash('error', ' 用户不存在'); 
                callback(err,results[0],fields);
            }
        }
        })
    };

    if (result != undefined) {
        return res.redirect('register');
    }    

/*  if (req.body.RegId.length != 18) {
        //输出身份证错误信息
        return res.redirect('register');
    }
    if (req.body.RegPhone.length != 11) {
        //输出电话错误信息
        return res.redirect('register');
    }*/

    sql ="insert into UserAccount (AccountID,AccountName,Password,Phone,Email,Type,IdNo) values(?,?,?,?,?,?,?)";

    if (req.body.Buy === 'on') {
        state = 0;
    } else {
        state = 1;
    }
    mysql.query(sql,[uuid,req.body.Reguser,req.body.Regpass,req.body.RegPhone,req.body.Regemail,state,req.body.RegId],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            req.session.user=req.body.Reguser;
            res.redirect('/');
        }
    });
});

module.exports = router;

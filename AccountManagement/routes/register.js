var express = require('express');
var router = express.Router();
var  client = require('../database');
var mysql = client.getDbCon();
var  uid = require('../utils/uuid');//用于生成id
var User = require('../models/user');
var Transaction = require('../models/transaction');

var uuid = uid.v4();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title : 'Express' ,
                        error: ''
                        });
});

router.route('/')
/*.get(function(req, res) {
    res.render('register', { title: '用户注册' ,
                             error: 'abc'
                            });
})*/
.post(function(req, res) {
    console.log(req.body);
    if (req.body['Reguser'] == '' || req.body['Regpass'] == '') {
        var err = "用户名或密码不能为空！";
        res.render('register', {error : err});
        return;
    }

    if(req.body['Regrepass']!=req.body['Regpass']){
        var err = "两次密码不相同！";
        res.render('register', { error : err});
        return;
    }

    var emailtest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailtest.test(req.body.Regemail)) {
        var err = '错误的邮箱格式！';
        res.render('register', { error : err});
        return;
    }

    var phonetest = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!phonetest.test(req.body.Regmobi)) {
        var err = '错误的手机号！';
        res.render('register', { error : err});
        return;
    }

    var idtest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idtest.test(req.body.Regid)) {
        var err = '错误的身份证号！';
        res.render('register', { error : err});
        return;
    }


    var  newUser =  new  User({ 
        name: req.body.Reguser, 
        password: req.body.Regpass,
        realname: req.body.Regname,
        phone: req.body.Regmobi,
        email: req.body.Regemail,
        Type: 0,
        IdNo: req.body.Regid
    }); 

    User.getUserByName(newUser.name, function (err, user) { 
        if (user) 
          err = '用户名已经存在！'; 
        if (err) { 
            res.render('register', { error : err});
            return;
        } 

        User.getUserByEmail(newUser.email, function (err, user) { 
            if (user) 
              err = '邮箱已经存在！'; 
            if (err) { 
                res.render('register', { error : err}); 
                return;
            } 

            User.getUserByID(newUser.IdNo,function (err,user) {
                if (user)
                    err = '身份证号已存在！';
                if (err) {
                    res.render('register',{error : err});
                    return;
                }
                var post_data = { realName: newUser.realname, idNumber: newUser.IdNo};
                Transaction.GetApi('http://121.42.175.1/A5/API/authentication', post_data, 80, function (data) {
                    console.log("-------------Test GET API-----------");
                    console.log(data);
                    if (data.result == '0') {
                        newUser.save(function (err) { 
                            if (err) { 
                                return  res.redirect('register'); 
                            } 
                            User.getUserByName(newUser.name, function (err, user) {
                                req.session.user = user.AccountID.toString();
                                res.redirect('http://121.42.175.1:5003/');
                            }); 
                        });
                    } else {
                        err = '实名认证失败！';
                        res.render('register', { error : err}); 
                        return;
                    }
                });
            });
        });
    });
});

module.exports = router;

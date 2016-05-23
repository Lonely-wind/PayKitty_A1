var express = require('express');
var router = express.Router();
var  client = require('../database');
var mysql = client.getDbCon();
var  uid = require('../utils/uuid');//用于生成id
var User = require('../models/user');

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

    if (req.body.user_type === "0") {
        state = 0;
    } else {
        state = 1;  
    }



    var  newUser =  new  User({ 
        name: req.body.Reguser, 
        password: req.body.Regpass,
        phone: req.body.Regmobi,
        email: req.body.Regemail,
        Type: state,
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

            newUser.save(function (err) { 
                if (err) { 
                     return  res.redirect('register'); 
                 } 
                User.getUserByName(newUser.name, function (err, user) {
                    req.session.user = user.AccountID.toString();
                    res.redirect('account/info');
                }); 
            });
        });
    });
});

module.exports = router;

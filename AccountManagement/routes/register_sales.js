var express = require('express');
var router = express.Router();
var  client = require('../database');
var mysql = client.getDbCon();
var  uid = require('../utils/uuid');//用于生成id
var User = require('../models/user');
var Dealer = require('../models/dealer');
var Transaction = require('../models/transaction');

var uuid = uid.v4();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register_sales',{title : 'Express' ,
                        error: ''
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

router.route('/')
/*.get(function(req, res) {
    res.render('register', { title: '用户注册' ,
                             error: 'abc'
                            });
})*/
.post(function(req, res) {
    if(req.body['Regrepass']!=req.body['Regpass']){
        var err = "两次密码不相同！";
        res.render('register_sales', { error : err});
        return;
    }

    var emailtest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailtest.test(req.body.Regemail)) {
        var err = '错误的邮箱格式！';
        res.render('register_sales', { error : err});
        return;
    }

    var phonetest = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!phonetest.test(req.body.Regmobi)) {
        var err = '错误的手机号！';
        res.render('register_sales', { error : err});
        return;
    }

    var idtest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idtest.test(req.body.Regid)) {
        var err = '错误的身份证号！';
        res.render('register_sales', { error : err});
        return;
    }



    var  newUser =  new  User({ 
        name: req.body.Reguser, 
        password: req.body.Regpass,
        realname: req.body.Regname,
        phone: req.body.Regmobi,
        email: req.body.Regemail,
        Type: 1,
        IdNo: req.body.Regid
    }); 
    console.log(newUser);
    var newDealer = new Dealer({
        DealerNo : 0,
        name: req.body.SalesName,
        address: req.body.SalesAddress,
        state: 'Normal'
    })
    User.getUserByName(newUser.name, function (err, user) { 
        if (user) 
          err = '用户名已经存在！'; 
        if (err) { 
            res.render('register_sales', { error : err});
            return;
        } 

        User.getUserByEmail(newUser.email, function (err, user) { 
            if (user) 
              err = '邮箱已经存在！'; 
            if (err) { 
                res.render('register_sales', { error : err}); 
                return;
            } 

            newUser.save(function (err) { 
                if (err) { 
                     return  res.redirect('register_sales'); 
                 } 
                User.getUserByName(newUser.name, function (err, user) {
                    req.session.user = user.AccountID.toString();
                    newDealer.DealerNo = req.session.user;
                    console.log(newDealer);
                     newDealer.save(function (err) {
                        if(err) {
                            return res.redirect('register_sales');
                        }
                        var post_data = { realName: newUser.realname, idNumber: newUser.IdNo};
                        Transaction.GetApi('A5/API/authentication', post_data, 5001, function (data) {
                            console.log("-------------Test GET API-----------");
                            console.log(data);
                            if (data.result == 'Accept') {
                                return res.redirect('account/info');
                            } else {
                                err = '实名认证失败！';
                                res.render('register_sales', { error : err}); 
                                return;
                            }
                        });
                        return  res.redirect('register_sales');                         
                     });  
                }); 



            });
        });
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title : 'Express', 
                      error : ''  
                        });
});

router.route('/')

.post(function(req, res) {

    var state;
    if (req.body.Buy === 'on') {
        state = 0;
    } else {
        state = 1;
    }
    User.getUserByName(req.body.Loginuser, function (err, user) { 
        if (err) {
            throw err;
        } else {
            if (user) {
               if (req.body.Loginpass === user.Password) {
                    console.log('Login Success!');
                    if (user.Type != state) {
                        var err = "用户类别错误！";
                        res.render('login', { error : err}); 
                    } else {
                        req.session.user = user.AccountID.toString();
                        console.log(user.AccountID);
                        res.redirect('account');
                    }
                } else {
                    var err = "用户密码错误！";
                    res.render('login', { error : err}); 
                }
            } else {
                User.getUserByEmail(req.body.Loginuser, function(err, user) {
                    if (err) {
                        throw err;
                    } else {
                        if (user) {
                            if (req.body.Loginpass === user.Password) {
                                console.log('Login Success!');
                                if (user.Type != state) {
                                    var err = "用户类别错误！";
                                    res.render('login', { error : err});   
                                } else {
                                    req.session.user = user.AccountID.toString();
                                    console.log(user.AccountID);
                                    res.redirect('account');
                                }
                            } else {
                                var err = "用户密码错误！";
                                res.render('login', { error : err}); 
                            }
                        } else {
                            var err = "用户不存在！";
                            res.render('login', { error : err}); 
                        }
                    }
                });
            }
        }
    });

  
});

module.exports = router;

var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(req.cookies.kitty);
  if(req.cookies.kitty){
    //console.log("hahahhahahahhaha");
        req.session.user=req.cookies.kitty;        
        
        res.redirect('account/info');
  }
  res.render('login',{title : 'Express', 
                      error : ''  
                        });
});

router.route('/')

.post(function(req, res) {

    if (req.body['Loginuser'] == '' || req.body['Loginpass'] == '') {
        var err = "用户名或密码不能为空！";
        res.render('login', {error : err});
        return;
    }

    var state;
    if (req.body.user_type === "0") {
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
                        return; 
                    } else {
                        if (user.State == 1) {
                            var err = "账户已停用！";
                            res.render('login',{error : err});
                            return;
                        } else {
                            req.session.user = user.AccountID.toString();
                            //req.session.name = user.AccountName.toString();
                            res.cookie('kitty',user.AccountID.toString());
                            //console.log(user.AccountID);
                            res.redirect('account/info');
                        }
                    }
                } else {
                    var err = "用户密码错误！";
                    res.render('login', { error : err}); 
                    return;
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
                                    return;
                                } else {
                                    req.session.user = user.AccountID.toString();
                                    //console.log(user.AccountID);
                                    res.redirect('account/info');
                                }
                            } else {
                                var err = "用户密码错误！";
                                res.render('login', { error : err});
                                return; 
                            }
                        } else {
                            var err = "用户不存在！";
                            res.render('login', { error : err});
                            return; 
                        }
                    }
                });
            }
        }
    });

  
});

module.exports = router;

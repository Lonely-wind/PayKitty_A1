var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title : 'Express'});
});

router.route('/')
.get(function(req, res) {
    res.render('login', { title: '用户登录' });
})
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
                        console.log('Wrong State!');
                        res.redirect('login');    
                    } else {
                        req.session.user = user.AccountID.toString();
                        console.log(user.AccountID);
                        res.redirect('account');
                    }
                } else {
                    console.log('Wrong Password!');
                    res.redirect('login');
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
                                    console.log('Wrong State!');
                                    res.redirect('login');    
                                } else {
                                    req.session.user = user.AccountID.toString();
                                    console.log(user.AccountID);
                                    res.redirect('account');
                                }
                            } else {
                                console.log('Wrong Password!');
                                res.redirect('login');
                            }
                        } else {
                            console.log('No Such User!');
                            res.redirect('login');
                        }
                    }
                });
            }
        }
    });

  
});

module.exports = router;

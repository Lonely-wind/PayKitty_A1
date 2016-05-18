var express = require('express');
var router = express.Router();
var  client = require('../database');
var mysql = client.getDbCon();
var  uid = require('../utils/uuid');//用于生成id
var User = require('../models/user');

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
        console.log("Different Password!");
        return res.redirect('register');
    }

    var emailtest = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailtest.test(req.body.Regemail)) {
        console.log('Wrong Email!');
        return res.redirect('register');
    }

    var phonetest = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!phonetest.test(req.body.Regmobi)) {
        console.log('Wrong Mobile Phone Number!');
        return res.redirect('register');
    }

    var idtest = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (!idtest.test(req.body.Regid)) {
        console.log('Wrong Id Number!');
        return res.redirect('register');
    }

    if (req.body.Buy === 'on') {
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
          err = 'Username already exists.'; 
        if (err) { 
          req.flash('error', err); 
          return res.redirect('register'); 
        } 

        User.getUserByEmail(newUser.email, function (err, user) { 
            if (user) 
              err = 'Email already exists.'; 
            if (err) { 
              req.flash('error', err); 
              return res.redirect('register'); 
            } 

            newUser.save(function (err) { 
                if (err) { 
                     return  res.redirect('register'); 
                 } 
                User.getUserByName(newUser.name, function (err, user) {
                    req.session.user = user.AccountID.toString();
                    res.redirect('account');
                }); 
            });
        });
    });
});

module.exports = router;

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
    var sql ="insert into UserAccount (AccountID,AccountName,Password,Phone,Email,State,IdNo) values(?,?,?,?,?,?,?)";
    if (req.body.Buy) {
        state = 0;
    } else {
        state = 1;
    }
    mysql.query(sql,[uuid,req.body.Reguser,req.body.Regpass,req.body.RegPhone,req.body.Regemail,state,req.body.RegId],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            //return callback(err, uuid, fields);
        }
    });
    res.redirect('login');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login',{title : 'Express'});
});

router.route('/')
.get(function(req, res) {
    res.render('login', { title: '用户登录' });
})
.post(function(req, res) {
    var user={
        username: 'admin',
        password: '123456'
    }
    var sql = "select * from UserAccount where AccountName = '" + req.body.Loginuser + "';";
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, fields);
        }
    });
    consolt.log(results);
    if(req.body.Loginuser === user.username && req.body.Loginpass === user.password){
    	req.session.user=req.body.Loginuser;
        res.redirect('/');
    }
    res.redirect('login');
});

module.exports = router;

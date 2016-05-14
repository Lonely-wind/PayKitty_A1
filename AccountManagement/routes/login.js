var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();
var success = 'false';
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
            console.log(results[0]);
            console.log(req.body);
            if (results[0] === undefined) {
            	//req.flash('error', ' 用户不存在'); 
            	res.redirect('login');
            } else {
            	if (req.body.Loginpass === results[0].Password) {
            		console.log(req.body.Loginpass);
            		req.session.user=req.body.Loginuser;
            		res.redirect('/');
            	} else {
            		//req.flash('error', ' 密码'); 
            		res.redirect('login');
            	}
            }
        }
    });
  
});

module.exports = router;

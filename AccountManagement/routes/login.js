var express = require('express');
var router = express.Router();

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
    if(req.body.Loginuser === user.username && req.body.Loginpass === user.password){
    	req.session.user=req.body.Loginuser;
        res.redirect('/');
    }
    res.redirect('login');
});

module.exports = router;

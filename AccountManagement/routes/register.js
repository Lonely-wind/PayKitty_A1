var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('register',{title : 'Express'});
});

router.route('/')
.get(function(req, res) {
    res.render('register', { title: '用户注册' });
})
.post(function(req, res) {
    var user={
        username: 'admin',
        password: '123456'
    }
    if(req.body.Loginuser === user.username && req.body.Loginpass === user.password){
        res.redirect('/');
    }
    res.redirect('login');
});

module.exports = router;

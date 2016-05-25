var express = require('express');
var router = express.Router();
var  client = require('../database');

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.user=null;
    //req.session.error=null;
    //req.session.destroy();
    res.redirect('/login');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var  client = require('../database');

var mysql = client.getDbCon();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.user=null;
    res.redirect('/login');
});

module.exports = router;

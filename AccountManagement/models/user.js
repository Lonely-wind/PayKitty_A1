var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id
var Dealer = require('../models/dealer');
function  User(user) {
    this.name = user.name;
    this.password = user.password;
    this.phone = user.phone;
    this.realname = user.realname;
    this.email = user.email;
    this.Type = user.Type;
    this.IdNo = user.IdNo;
}

var tableName = "UserAccount";
mysql = client.getDbCon();
module.exports = User;
//新增用户


User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password,
        realname: this.realname,
        phone: this.phone,
        email: this.email,
        Type: this.Type,
        IdNo: this.IdNo
    };
    //uuid = uid.v4();
    //插入数据库
    var sql ="insert into UserAccount (AccountName,Password,Name,Phone,Email,Type,IdNo,Balance) values(?,?,?,?,?,?,?,?)";

    mysql.query(sql,[user.name,user.password,user.realname,user.phone,user.email,user.Type,user.IdNo,0],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, user.IdNo, fields);
        }
    });
};

//获取用户
/*
User.get =  function  get(username, callback) {

        // 读取 users 集合
        var sql = "select c.id,c.name,c.password from user c where c.name='"+username+"'";
        console.log(sql);
        mysql.query(sql,function(err,results,fields){
            if(err){
                throw err;
            }else{
                console.log(results[0]);
                callback(err,results[0],fields);
            }
        })

};
*/

User.getUserByName = function getUserByName(AccountName, callback) {

    // 读取 users 集合
    var sql = "select * from UserAccount where AccountName='"+AccountName+"'";
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            //console.log(results[0]);
            callback(err,results[0],fields);
        }
    })

};

User.getUserByEmail = function getUserByEmail(Email, callback) {

    // 读取 users 集合
    var sql = "select * from UserAccount where Email='"+Email+"'";
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            //console.log(results[0]);
            callback(err,results[0],fields);
        }
    })

};

User.getInfo = function getInfo(accountID, callback) {

    // 读取 users 集合
    var sql = "select * from UserAccount where AccountID='"+accountID+"'";
    //console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            //console.log(results[0]);
            callback(err,results[0],fields);
        }
    })

};

User.setInfo = function setInfo(accountID, user, callback) {
    var sql = "update UserAccount set Phone="+user.phone+" where AccountID='"+accountID+"'";
    //console.log(sql);
    mysql.query(sql,function(err,results,fields){
        callback(err,results);
    })

};

User.delAccount = function delAccount(accountID) {

    var sql = "delete from UserAccount where AccountID='"+accountID+"'";

    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            console.log(results);
            //callback(err,results[0],fields);
        }
    })

};

User.addMoney = function addMoney(accountID, amount) {
    var sql = "update UserAccount set Balance=Balance+"+amount+" where AccountID='"+accountID+"'";
    //console.log(sql);
    mysql.query(sql,function(err,results,fields){
        console.log(results);
        //callback(err,results);
    })

};

User.subMoney = function subMoney(accountID, amount) {
    var sql = "update UserAccount set Balance=Balance-"+amount+" where AccountID='"+accountID+"'";
    console.log('----------subMoney-----------------');
    mysql.query(sql,function(err,results,fields){
        console.log(results);
        //callback(err,results);
    })

};


User.writeDealer = function  writeDealer(DealerNo,name,address,state,callback) {
    // 用户对象
    //uuid = uid.v4();
    //插入数据库
    var sql ="insert into DealerAccount (DealerNo,Name,Address,State) values(?,?,?,?)";

    mysql.query(sql,[DealerNo,name,address,state],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, DealerNo, fields);
        }
    });
};

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
    var sql = "update UserAccount set Phone="+user.phone+",Password="+user.loginpasswd+",PayPassword="+user.paypasswd+" where AccountID='"+accountID+"'";
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

User.addMoney = function addMoney(accountID, amount,callback) {
    var sql = "update UserAccount set Balance=Balance+"+amount+" where AccountID='"+accountID+"'";
    //console.log(sql);
    mysql.query(sql,function(err,results,fields){
        //console.log("hahahahhaa");
        //console.log(results);
        callback(err,results);
    })

};

User.subMoney = function subMoney(accountID, amount,callback) {
    var sql = "update UserAccount set Balance=Balance-"+amount+" where AccountID='"+accountID+"'";
    console.log('----------subMoney-----------------');
    mysql.query(sql,function(err,results,fields){
        //console.log(results);
        callback(err,results);
    })

};


User.getTotalMessage = function getTotalMessage(accountID, callback) {
    var sql = "select * from UserMessage where accountID='"+accountID+"'";
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        console.log(results);
        callback(err,results);
    })
};

User.getClickedMessage = function getClickedMessage(accountID, backUrl, callback) {
    var sql = "select * from UserMessage where accountID='" + accountID + "'" + " and isClick = false";
    console.log(sql);
    mysql.query(sql,function(err, results, fields){
        var messages = new Array();
        for(var i in results){
            var date = new Date();
            var date1 = new Date(results[i].MessageTime);
            var time = "";
            var time_diff = 0;
            if(time_diff = (parseInt(date.getFullYear())- parseInt(date1.getFullYear()))){
                time = time_diff + "年之前"
            }
            else if(time_diff = (parseInt(date.getMonth())- parseInt(date1.getMonth()))){
                time = time_diff + "月之前"
            }
            else if(time_diff = (parseInt(date.getDate())- parseInt(date1.getDate()))){
                time = time_diff + "天之前"
            }
            else if(time_diff = (parseInt(date.getHours())- parseInt(date1.getHours()))){
                time = time_diff + "小时之前"
            }
            else if(time_diff = (parseInt(date.getMinutes())- parseInt(date1.getMinutes()))){
                time = time_diff + "分钟之前"
            }
            else if(time_diff = (parseInt(date.getSeconds())- parseInt(date1.getSeconds()))){
                time = time_diff + "秒之前"
            }
            var message = {
                message : results[i].MessageContent,
                time : time,
                href : "/account"+ backUrl +"/message/" + results[i].MessageID + "/click",
                sender : results[i].MessageSender
            }
            messages.push(message);
        }
        callback(err, messages);
    });
};

User.clickMessage = function clickMessage(accountID, messageID) {
    var sql = "update UserMessage set isClick = true where accountID='"+accountID+"' and messageID='"+messageID+"'";
    mysql.query(sql,function(err,results,fields){
        console.log(err);
    });
};

User.clickAllMessage = function clickAllMessage(accountID) {
    var sql = "update UserMessage set isClick = true where accountID='"+accountID+"'";
    mysql.query(sql,function(err,results,fields){
        console.log(err);
    });
};

User.insertMessage = function insertMessage(data, callback) {
    var sql = "Insert into UserMessage values(NULL, " + data.accountID + ", "+ data.sender + ", '" + data.message + "', NULL, default)";
    console.log(sql);
    mysql.query(sql,function(err,results,fields){
        console.log(results);
        callback(err);
    })
};

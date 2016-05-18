var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id
function  User(user) {
    this.name = user.name;
    this.password = user.password;
    this.phone = user.phone;
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
        phone: this.phone,
        email: this.email,
        Type: this.Type,
        IdNo: this.IdNo
    };
    //uuid = uid.v4();
    //插入数据库
    var sql ="insert into UserAccount (AccountName,Password,Phone,Email,Type,IdNo,Balance) values(?,?,?,?,?,?,?)";

    mysql.query(sql,[user.name,user.password,user.phone,user.email,user.Type,user.IdNo,0],function(err,results,fields){
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
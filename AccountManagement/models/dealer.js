var  client = require('../database');
var  uid = require('../utils/uuid');//用于生成id

function Dealer(dealer) {
    this.DealerNo = dealer.DealerNo;
    this.name = dealer.name;
    this.address = dealer.address;
    this.state = dealer.state;
}

var tableName = "DealerAccount";
mysql = client.getDbCon();
module.exports = Dealer;

Dealer.prototype.save = function  save(callback) {
    // 用户对象
    var  dealer = {
        DealerNo: this.DealerNo,
        name: this.name,
        address: this.address,
        state: this.state
    };
    //uuid = uid.v4();
    //插入数据库
    var sql ="insert into DealerAccount (DealerNo,Name,Address,State) values(?,?,?,?)";
                    console.log(dealer);
    mysql.query(sql,[dealer.DealerNo,dealer.name,dealer.address,dealer.state],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, dealer.DealerNo, fields);
        }
    });
};

Dealer.getInfo = function getInfo(accountID, callback) {

    // 读取 users 集合
    var sql = "select * from DealerAccount where DealerNo='"+accountID+"'";
    //console.log(sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            console.log(results[0]);
            console.log('**************************************');
            callback(err,results[0],fields);
        }
    })

};


Dealer.delAccount = function delAccount(accountID) {

    var sql = "delete from DealerAccount where DealerNo='"+accountID+"'";

    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            console.log(results);
            //callback(err,results[0],fields);
        }
    })

};
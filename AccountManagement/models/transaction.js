var url = require('url');
var querystring = require('querystring');
var http = require('http');
function  Transaction() {
};
Transaction.GetApi = function GetApi(regUrl, postData,  port,callback){
    var post_option = url.parse(regUrl);
    post_option.method = 'POST';
    post_option.port = parseInt(port);
    console.log(port);
    var post_data = querystring.stringify(postData);
    post_option.headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Content-Length' : post_data.length,
    };
    var responseData = '';
    var x = '';
    var post_req = http.request(post_option, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            responseData += chunk;
        }).on('end', function() {
            x = JSON.parse(responseData);
            callback(x);
        })
    }).on('error', function(e){
        console.log("Got error: " + e.message);
        throw e;
    });
    post_req.write(post_data);
};
Transaction.Search = function Search(data, order_constraints, callback){
    var trade_data = new Array();
    for (var i in data){
        var time = new  Date(data[i].orderTime.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/"));
        if(time < order_constraints.start_time || time > order_constraints.end_time){
            continue;
        }
        if((order_constraints.low_money != "" && (parseFloat(data[i].orderAmount) < parseFloat(order_constraints.low_money)))||(order_constraints.upper_money != "" && (parseFloat(data[i].orderAmount) > parseFloat(order_constraints.upper_money)))){
            continue;
        }
        if(order_constraints.state != "全部状态" && order_constraints.state != data[i].orderStatus){
            continue;
        }
        if(order_constraints.seller != "" && order_constraints.seller != data[i].seller){
            continue;
        }
        trade_data.push(data[i]);
    }
    callback(trade_data)
}
Transaction.RealGetApi = function RealGetApi(regUrl,  port,callback){
    var post_option = url.parse(regUrl);
    post_option.method = 'GET';
    post_option.port = parseInt(port);
    console.log(port);
    var responseData = '';
    var x = '';
    var post_req = http.request(post_option, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            responseData += chunk;
        }).on('end', function() {
            x = JSON.parse(responseData);
            //x = responseData;
            callback(x);
        })
    }).on('error', function(e){
        console.log("Got error: " + e.message);
        throw e;
    });
    post_req.end();
};
Transaction.GetStatistics = function GetStatistics(data, callback){
    var thisMonthTransaction={
        total_account : 0,
        total_order : 0,
        order_success : 0,
        order_fail : 0,
        order_other : 0  
    };
    var totalTransaction={
        total_account : 0,
        total_order : 0,
        order_success : 0,
        order_fail : 0,
        order_other : 0        
    }
    var nowTime = new Date();
    var isThisMonth = 0;
    for (var i in data){
        var time = new  Date(data[i].orderTime.replace(/(^\s*)|(\s*$)/g, '').replace(/\/|\.|\-/g, "/"));
        console.log(parseInt(nowTime.getMonth()) + "----------------" +  parseInt(time.getMonth()));
        console.log(parseInt(nowTime.getMonth()) ==  parseInt(time.getMonth()));
        if(parseInt(nowTime.getMonth()) ==  parseInt(time.getMonth())){
            isThisMonth = 1;
        }
        else{
            isThisMonth = 0;
        }
        totalTransaction.total_order++;
        totalTransaction.total_account += parseFloat(data[i].orderAmount);
        thisMonthTransaction.total_order+= isThisMonth;
        thisMonthTransaction.total_account +=  isThisMonth * parseFloat(data[i].orderAmount);        
        if(data[i].orderStatus == "交易成功"){
            totalTransaction.order_success++;
            thisMonthTransaction.order_success+= isThisMonth;            
        }
        else if(data[i].orderStatus == "交易关闭" || data[i].orderStatus == "已退款"){
            totalTransaction.order_fail++;
            thisMonthTransaction.order_fail+= isThisMonth;            
        }
        else{
            totalTransaction.order_other++;
            thisMonthTransaction.order_other+= isThisMonth;
        }
    }
    callback(thisMonthTransaction, totalTransaction);
}
module.exports = Transaction;
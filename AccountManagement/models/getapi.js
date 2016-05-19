var url = require('url');
var querystring = require('querystring');
var http = require('http');
var GetApi = function GetApi(regUrl, postData,  callback){
    var post_option = url.parse(regUrl);
    post_option.method = 'POST';
    post_option.port = 5001;
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
            for (var i = x.length - 1; i >= 0; i--) {
                console.log(x[i].num + "\t" + x[i].seller + "\t" + x[i].money + "\t" + x[i].state + "\n");
            };
            callback(x);
        })
    }).on('error', function(e){
        console.log("Got error: " + e.message);
        throw e;
    });
    post_req.write(post_data);
};
module.exports = GetApi;
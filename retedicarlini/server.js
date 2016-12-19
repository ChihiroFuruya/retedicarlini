//
// AGGIUNGO TUTTE LE LIBRERIE NECESSARIE
//
var http = require('http');
var util = require('util');
var app_port = process.env.app_port || 8080;
var app_host = process.env.app_host || '127.0.0.1';
var date = new Date();
var express = require('express');
var request = require('request');
var https = require('https'); //Https module of Node.js

// Express configuration
var my_obj;
var app = express();
// var port = 3000; ---> solo in locale
var code = "";
var token = "";
var client_id = "1422290841403856"; // IL CLIENT ID DELLA NOSTRA APP FACEBOOK
var client_secret = "796a332d7c5b7ffb9637acd6c30fb364"; // IL CLIENT SECRET DELLA NOSTRA APP
var message = "";
var getCode = "https://www.facebook.com/dialog/oauth?client_id="+client_id+"&redirect_uri=http://retedicarlini.cloudno.de//token&scope=user_about_me,publish_actions";




app.get('/', function(req, res){
		res.sendfile("sito.html");
   });

/*app.get('/facebook', function (req, res) {
  res.send('code: ' + req.query.code + "<br><br><button onclick='window.location.href=\"/token\"'>Get Token</button>");
  code = req.query.code;
});
*/ 

app.get('/token', function(req, res){
	code = req.query.code;
    var url = 'https://graph.facebook.com/v2.8/oauth/access_token?';
	var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	var body ="code="+code+"&client_id="+client_id+"&client_secret="+client_secret+"&redirect_uri=http://retedicarlini.cloudno.de//token&grant_type=client_credentials";
	var request = require('request');
	request.post({
		headers: headers,
		url:     url,
		body: body
		}, function(error, response, body){
			my_obj=JSON.parse(body);
			var accessToken = my_obj.access_token;
			res.send('<style>body {background-image: url("http://gitweb.cloudno.de/git-web/gitweb.cgi?p=migliore.1613614/3278-4ab6d464cef2e3e39285e7d6f4262661.git;a=blob_plain;f=carlini.jpg;h=a5ff447925e9a434aa3a7baaac1ed4098848f669;hb=006eb750b97831141b8b5379e96be42a8d0e20f8"); background-size: cover;}</style><form action="http://retedicarlini.cloudno.de/api" method="get">   <select name="message" id="message" onchange="this.form.submit()"><option value ="">Seleziona il Pug da condividere</option><option value="http://gitweb.cloudno.de/git-web/gitweb.cgi?p=migliore.1613614/3278-4ab6d464cef2e3e39285e7d6f4262661.git;a=blob_plain;f=carlini2.png;h=10d5c9c6cb61e86c1fbb9a906cc0dea5c529d506;hb=595b6e444193402640abdec427b92f6c23c2f07d">Lord of the Pugs</option><option value="http://gitweb.cloudno.de/git-web/gitweb.cgi?p=migliore.1613614/3278-4ab6d464cef2e3e39285e7d6f4262661.git;a=blob_plain;f=gameof.jpg;h=82cca5ca5e1d2eac21d7bf0b9dfb01d7a2cb9536;hb=595b6e444193402640abdec427b92f6c23c2f07d">Throne of Pugs</option><option value="http://gitweb.cloudno.de/git-web/gitweb.cgi?p=migliore.1613614/3278-4ab6d464cef2e3e39285e7d6f4262661.git;a=blob_plain;f=yoda.jpg;h=8113223ed5b8a677064c1a4599f45010a079dc2a;hb=595b6e444193402640abdec427b92f6c23c2f07d">Star Pugs</option></select></form>');
			});

});

app.get('/api', function(req, res){
	//riprendo il token per sicurezza .
var FB = require('fb');
FB.api('oauth/access_token', {
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: 'http://retedicarlini.cloudno.de/token',
    code: code,
}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }

    var accessToken = res.access_token;
	console.log(accessToken);
    var expires = res.expires ? res.expires : 0;
    FB.setAccessToken(accessToken);
    var body = req.query.message;
FB.api('me/photos', 'post', { "url" : body }, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
  	var amqp = require('amqplib');

	amqp.connect('amqp://hejatgnt:pU0W1thf6tYcT305BI2tdWI9ORuhP9xN@spotted-monkey.rmq.cloudamqp.com/hejatgnt').then(function(conn) {
	return conn.createChannel().then(function(ch) {
    var q = 'hello';
    var currentdate = new Date(); 
	var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + (currentdate.getHours()+1) + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    var msg = 'CARLINO POSTATO IL :'+datetime;

    var ok = ch.assertQueue(q, {durable: false});

    return ok.then(function(_qok) {
      // NB: `sentToQueue` and `publish` both return a boolean
      // indicating whether it's OK to send again straight away, or
      // (when `false`) that you should wait for the event `'drain'`
      // to fire before writing again. We're just doing the one write,
      // so we'll ignore it.
      ch.sendToQueue(q, new Buffer(msg));
      console.log(" [x] Sent '%s'", msg);
      return ch.close();
    });
  }).finally(function() { conn.close(); });
});
});  
});
    var currentdate = new Date(); 
	var datetime = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + (currentdate.getHours()+1) + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
	res.send('HAI POSTATO UN BELLISSIMO CARLINO IL'+datetime);
});


console.log('Server listen in port '+app_port+'. Connect to localhost');
app.listen(app_port);

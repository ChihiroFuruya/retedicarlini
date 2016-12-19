var request = require('request');
var amqp = require('amqplib');
var telegramId = '79627915';
var telegramToken = '258370119:AAFyNi2jiF4e1NyOmwsoEZ-t1IhGG0SWDY4';
var url = '';

amqp.connect('amqp://hejatgnt:pU0W1thf6tYcT305BI2tdWI9ORuhP9xN@spotted-monkey.rmq.cloudamqp.com/hejatgnt').then(function(conn) {
  process.once('SIGINT', function() { conn.close(); });
  return conn.createChannel().then(function(ch) {

    var ok = ch.assertQueue('hello', {durable: false});

    ok = ok.then(function(_qok) {
      return ch.consume('hello', function(msg) {
        console.log(" [x] Ricevuto '%s'", msg.content.toString());
		
		request.get({
		url:     'https://api.telegram.org/bot'+telegramToken+'/sendMessage?chat_id='+telegramId+'&text='+msg.content.toString()+'',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'//application/json
		},
		});
		
      }, {noAck: true});
    });

    return ok.then(function(_consumeOk) {
      console.log(' [*] Waiting for messages. To exit press CTRL+C');
    });
  });
});

//https://api.telegram.org/bot258370119:AAFyNi2jiF4e1NyOmwsoEZ-t1IhGG0SWDY4/sendMessage?chat_id=79627915&text=carlinoscool
//79627915 //id mio

//https://api.telegram.org/bot'+telegramToken+'/sendMessage?chat_id='+telegramid+'&text=carlinoscool

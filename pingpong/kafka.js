var request = require('request');

// produces a ping, unless triggered on a "ping" event
exports.ping = function(event, callback) {
  if (event.data.message && event.data.message == "pong") {
    console.log("Got", event.data, "producing", "ping");
    produce("ping", callback);
  } else {
    console.log("I'm not replying to my own ping");
    callback(null, "OK, nothing to produce");
  }
}

// if receives a ping, produces a pong
exports.pong = function(event, callback) {
  if (event.data.message && event.data.message == "ping") {
    console.log("Got", event.data, "producing", "pong");
    produce("pong", callback);
  } else {
    console.log("I'm not replying to my own pong");
    callback(null, "OK, nothing to produce");
  }
}

function produce(message, callback) {
  var kafkaHost = process.env["KAFKA_HOST"]
  var kafkaUser = process.env["KAFKA_USER"]
  var kafkaPassword = process.env["KAFKA_PASSWORD"]
  var topic = 'thbkrkr.pingpong'

  event = { user: 'pingpong@bot-bot1', message: message }
  event = JSON.stringify(event)

  var start = +new Date()
  request.post(
    kafkaHost + '/topic/' + topic,
    {
      auth: {
        user: kafkaUser,
        password: kafkaPassword
      },
      json: [ { Value: event } ],
    },
    function (error, response, body) {
      console.log("Kafka production status:", response.statusCode, body, "in", +new Date() - start)
      callback(null, "Produced " + message);
    });
}
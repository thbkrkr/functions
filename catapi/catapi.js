var request = require('request')
var kafka = require('./kafka')

var me = 'catapi@funk-bot'
var topic = 'thbkrkr.miaou'

exports.handler = function(event, callback) {
  console.log(event)

  // Skip if it's my message
  if (event.data.user == me) {
    return callback(null, "200 hi me!")
  }

  // Error if no message
  if (!event.data.message) {
    return callback(JSON.stringify({message: "message not found"}))
  }

  // Ping
  if (event.data.message == 'ping') {
    kafka.pub(topic, {
      user: me,
      message: 'pong'
    }, callback)
    return
  }

  // Stop if no cat found in the message
  if (!event.data.message || (
      event.data.message.indexOf(' cat')  == -1 &&
      event.data.message.indexOf('!cat')  == -1 &&
      event.data.message.indexOf(' chat') == -1 &&
      event.data.message.indexOf('miaou') == -1 &&
      event.data.message.indexOf('minou') == -1 )) {
    return callback(null, "cat not found")
  }

  var req = {
    uri: 'http://thecatapi.com/api/images/get?format=src&type=gif',
    followRedirect: false
  }

  request(req, function (error, response, body) {
    // Handle error
    if (error) return callback(error, null)

    // Send the cat image to kafka
    kafka.pub(topic, {
      user: me,
      message: '<img src=\"'+response.headers.location+'\">'
    }, callback)
  })

}

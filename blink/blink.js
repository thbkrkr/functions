var request = require('request')
var kafka = require('./kafka')

var me = 'blink~bot-bot'
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

  if (event.data.message.indexOf('!blink ') != -1) {
    number = event.data.message.replace('!blink ', '')*1
    console.log('!blink detected', number)
    for (var i = 0; i < number; i++) {
      kafka.pub(topic, {
        user: me,
        message: 'blink'
      }, callback)
    }
    return
  }

  callback('', 'nothing to do')

}

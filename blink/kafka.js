var request = require('request')

exports.pub = function(topic, msg, callback) {
  var kafkaHost = process.env["KAFKA_HOST"]
  var kafkaUser = process.env["KAFKA_USER"]
  var kafkaPassword = process.env["KAFKA_PASSWORD"]

  start = +new Date()
  request.post(
    kafkaHost + '/topic/' + topic + '?format=raw',
    {
      auth: {
        user: kafkaUser,
        password: kafkaPassword
      },
      json: msg,
    },
    function (error, response, body) {
      if (callback) {
        if (error) callback(error)
        msg.duration = (+new Date() - start)+'ms'
        callback(null, JSON.stringify(msg))
      }
    })
}
const lib = require('./lib')

const topic = process.env["KAFKA_TOPIC"]

exports.kafka = function(event, callback) {
  lib.toKafka(topic, event.data, callback)
}

exports.chat = function(event, callback) {
  lib.toKafka(topic, event.data, callback)
}

exports.es = function(event, callback) {
  lib.toES(event.data, callback)
}

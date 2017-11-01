const request = require('request')
  , crypto = require('crypto');

exports.toKafka = function(topic, obj, callback) {
  const host = process.env["KAFKA_HOST"]
  const user = process.env["KAFKA_USER"]
  const password = process.env["KAFKA_PASSWORD"]

  const url = host + '/topic/' + topic + '?format=raw'

  httpPost(url, user, password, obj, callback)
}

exports.toES = function(obj, callback) {
  const host = process.env["ES_HOST"]
  const user = process.env["ES_USER"]
  const password = process.env["ES_PASSWORD"]

  const id = crypto.createHash('sha1').update(JSON.stringify(obj)).digest('hex')
  const url = host + '/' + id

  httpPost(url, user, password, obj, callback)
}

function httpPost(url, user, password, body, callback) {
  if (!body) return callback("body undefined")

  const start = +new Date()
  try {
    request.post(
      url, {
        auth: {
          user: user,
          password: password
        },
        json: body,
      },
      function (err, response, body) {
        const status = response.statusCode

        if (status < 200 || status > 299) {
          console.log('error', 'invalid status code', status)
          return callback('invalid status code', status)
        }

        if (err) {
          console.log('error', err)
          callback(err)
        }

        result = 'message sent in es in '+(+new Date() - start)+'ms, status '+status
        console.log(result)
        callback(null, result)
      })
  } catch(err) {
    callback(err)
  }
}
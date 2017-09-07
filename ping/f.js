exports.ping = function(event, callback) {
  var url = process.env.URL;
  console.log("debug url", url);
  callback(null, "pong ("+url+")")
}
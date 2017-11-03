const lib = require('./lib')

const topic = process.env["KAFKA_TOPIC"]

exports.mm = function(event, callback) {
  e = event.data

  text = `:warning: ${e.ID} [${e.Status}](http://toctoc.c1.banane.ovh/s/?ns=faas)`
  msg = {
    "text": text,
    "username":"toctoc",
    "icon_url": "https://q.blurb.space/s/img/56.png",
    "channel":"tests"
  }

  lib.toKafka(topic, msg, callback)
}

/* {
  "TTL": 10,
  "ID": "badaboum.a/n1.k.g.i.h.net",
  "Status": "KO",
  "Timestamp": "2017-11-03T00:17:55.748725258Z",
  "Value": {
    "CheckTTL": 10,
    "Host": "n1.k.g.i.h.net",
    "Message": "Latency < 100ms",
    "Service": "badaboum.a",
    "State": "OK"
  }
}*/

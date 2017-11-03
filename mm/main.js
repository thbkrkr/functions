const f = require('./push')

f.mm({data:{
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
  }}
}, function(err, result) {
  console.log('result', result)
  console.log('err', err)
})
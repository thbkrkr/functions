exports.ping = function(event, callback) {
  console.log("debug CDS_APP_URL", process.env.CDS_APP_URL);
  console.log("debug CDS_ENV_BIM1", process.env.CDS_ENV_BIM1);
  console.log("debug CDS_ENV_BIM2", process.env.CDS_ENV_BIM2);
  console.log("debug LANG", process.env.LANG);
  callback(null, "pong")
}
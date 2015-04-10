var yelp = require("yelp").createClient({
  consumer_key: "UqXizzKMtmdC-2rj32YE7Q",
  consumer_secret: "MdDNtIsK029Yccbtp-_f9cRfGL4",
  token: "UCAyWQm60Axw8TNYQvXhX9r8YNfc51Lo",
  token_secret: "GCIfYIjMX4FQxM7CP7BAAuVCbsU"
});


var getstuff = function(array, callback) {
  console.log('here');
  yelp.search({term: "bar,club", location: "Toronto"}, function(error, data) {
      console.log(data);
  return callback(data);
});
};


module.exports = {
  getInfo: getstuff
  };

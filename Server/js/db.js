var yelp = require("yelp").createClient({
  consumer_key: "UqXizzKMtmdC-2rj32YE7Q",
  consumer_secret: "MdDNtIsK029Yccbtp-_f9cRfGL4",
  token: "UCAyWQm60Axw8TNYQvXhX9r8YNfc51Lo",
  token_secret: "GCIfYIjMX4FQxM7CP7BAAuVCbsU"
});


var getHouses = function(city, range, max, callback) {
  yelp.search({term: "bar", location: "Toronto"}, function(error, data) {
  console.log(error);
  console.log(data);
});


};

var request = require('request');
var services = require('./services');

function checkAuth(token, callback) {
	var reqUrl = services.auth + '/user/' + token;
	request.get(reqUrl, {}, function(err, response, body){
		if (response.statusCode === 200) {
			callback(null, JSON.parse(body));
		} else {
			callback(response.statusCode, body);
		}
	});
}

module.exports = {
	checkAuth: checkAuth
};
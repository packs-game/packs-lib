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

function getCards(callback) {
	var reqUrl = services.cards + '/cards';
	request.get(reqUrl, {}, function(err, response, body){
		if (err || !response) { return callback(err); }
		if (response.statusCode === 200) {
			callback(null, JSON.parse(body));
		} else {
			callback(response.statusCode, body);
		}
	});
}

function openItem(id, token, itemName, callback) {
	var reqUrl = services.items + '/open';
	request.get(reqUrl, {id: id, token: token, toOpen: itemName}, function(err, response, body){
		if (err || !response) { return callback(err); }
		if (response.statusCode === 200) {
			callback(null, JSON.parse(body));
		} else {
			callback(response.statusCode, body);
		}
	});
}

module.exports = {
	checkAuth: checkAuth,
	getCards: getCards,
	openItem: openItem
};
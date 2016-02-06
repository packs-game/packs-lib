//express middleware for x-domain
var services = require('./services');
module.exports = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', services.app);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};
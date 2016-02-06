var api = require('./api');

//express middleware to check auth credentials
function auth(req, res, next) {
	if (!req.body || !req.body.id || !req.body.token) { return res.sendStatus(400); }
	api.checkAuth(req.body.token, function(err,user){
		if (err) { return res.sendStatus(400); }
		next();
	});
}

module.exports = auth;
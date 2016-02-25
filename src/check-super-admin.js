var api = require('./api');

//express middleware to check auth credentials
function auth(req, res, next) {
	if (!req.body || !req.body.id || !req.body.token) { return res.send(400).send('Missing id or token in request.'); }
	api.checkAuth(req.body.token, function(err,user){
		if (!user.superAdmin) { return res.status(400).send('User not superadmin.'); }
		if (err) { return res.sendStatus(400); }
		next();
	});
}

module.exports = auth;
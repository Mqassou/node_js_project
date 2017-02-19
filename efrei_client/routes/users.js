var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next){
	request('http://localhost:3000/users', function (error, response, body) {
		var result = JSON.parse(body).users;
  		if (!error && response.statusCode == 200) {
			res.render('users', { users: result });
		}
		else{
			res.render('Error');
		}
	})
});


router.get('/:id', function(req, res, next){
	request('http://localhost:3000/users/' + req.params.id, function (error, response, body) {
		var result = JSON.parse(body).user;
  		if (!error && response.statusCode == 200) {
			res.render('user', { user: result });
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
module.exports = router;
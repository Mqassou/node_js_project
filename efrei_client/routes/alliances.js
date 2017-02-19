var express = require('express');
var router = express.Router();
var request = require('request');


router.get('/', function(req, res, next){
	request('http://localhost:3000/alliances', function (error, response, body) {
		var result = JSON.parse(body).alliances;
  		if (!error && response.statusCode == 200) {
			res.render('alliances', { alliances: result });
		}
		else{
			res.render('Error');
		}
	})
});


router.get('/:id', function(req, res, next){
	request('http://localhost:3000/alliances/' + req.params.id, function (error, response, body) {
		var result = JSON.parse(body).alliance;
  		if (!error && response.statusCode == 200) {
			res.render('alliance', { alliance: result });
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
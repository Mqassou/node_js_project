var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next){
	request('http://localhost:3000/characters', function (error, response, body) {
		var result = JSON.parse(body).characters;
  		if (!error && response.statusCode == 200) {
			res.render('characters', { characters: result });
		}
		else{
			res.render('Error');
		}
	})
});


router.get('/:id', function(req, res, next){
	request('http://localhost:3000/characters/' + req.params.id, function (error, response, body) {
		var result = JSON.parse(body).character;
  		if (!error && response.statusCode == 200) {
			res.render('character', { character: result });
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
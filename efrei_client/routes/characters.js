var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next){
	request('http://localhost:3000/characters', function (error, response, body) {
		var result = JSON.parse(body).characters;
  		if (!error && response.statusCode == 200) {
		
			request('http://localhost:3000/users/',  function (error, response, body) {
				var result2 = JSON.parse(body).users;
				if (!error && response.statusCode == 200) {
				
					result.forEach((character)=> {
						result2.forEach((user)=> {
							if(character.user_id == user.id){
								character.user_id=  user.name;
							}
						})
					})
					
					
				res.render('characters', { characters: result });
				}
				else{
					res.render('Error');
				}
				})	
			
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
			request('http://localhost:3000/users/',  function (error, response, body) {
				var result2 = JSON.parse(body).users;
				if (!error && response.statusCode == 200) {
				
					
						result2.forEach((user)=> {
							if(result.user_id == user.id){
								result.user_id=  user.name;
							}
						})
					
					
					
				res.render('character', { character: result });
				}
				else{
					res.render('Error');
				}
				})
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
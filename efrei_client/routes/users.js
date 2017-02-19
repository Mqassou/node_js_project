var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next){
	request('http://localhost:3000/users', function (error, response, body) {
		var result = JSON.parse(body).users;
	
  		if (!error && response.statusCode == 200) {
		
		
			request('http://localhost:3000/alliances/',  function (error, response, body) {
				var result2 = JSON.parse(body).alliances;
				if (!error && response.statusCode == 200) {
				
					result.forEach((user)=> {
						result2.forEach((alliance)=> {
							if(user.alliance_id == alliance.id){
								user.alliance_id=  alliance.name;
							}
						})
					})
					
					
					res.render('users', { users: result });
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
	request('http://localhost:3000/users/' + req.params.id, function (error, response, body) {
		var result = JSON.parse(body).user;
			
  		if (!error && response.statusCode == 200) {
		 request('http://localhost:3000/alliances/',  function (error, response, body) {
				
				if (!error && response.statusCode == 200) {
				var result2 = JSON.parse(body).alliances;
					result2.forEach((alliance)=> {
						
							if(result.alliance_id == alliance.id){
								result.alliance_id=  alliance.name;
							}
						 
					})
					res.render('user', { user: result });
				}
				else{
					res.render('Error');
				}
			});
			
		}
		else{
			res.render('Error');
		}
	})
});

module.exports = router;
module.exports = router;
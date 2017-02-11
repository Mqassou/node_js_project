var express = require('express');
var UserDAO=require('../models/userdao');
var router = express.Router();


router.get('/',function(req,res,next){
UserDAO.getAll()
.then((users)=>{
res.status(200).send({ status: 'success', users: users });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});


router.get('/:id',function(req,res,next){
var id=parseInt(req.params.id);
UserDAO.getById(id)
.then((user)=>{
res.status(200).send({ status: 'success', user: user });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});



router.post('/', function(req, res) {
    var user_name = req.body.user.name;
    var user_email = req.body.user.email;
    var user_alliance_id = req.body.user.alliance_id;

UserDAO.insertUser(user_name,user_email,user_alliance_id)
.then((user)=>{

res.status(200).send({ status: 'success',message:'Inserted one user', user: user });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});


router.put('/:id', function(req, res) {
	var user_id=parseInt(req.params.id);
    var user_name = req.body.user.name;
    var user_email = req.body.user.email;
    var user_alliance_id = req.body.user.alliance_id;

UserDAO.updateUser(user_id,user_name,user_email,user_alliance_id)
.then((user)=>{

res.status(200).send({ status: 'success',message:'modified a user', user: user });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});

router.delete('/:id', function(req, res) {
	var user_id=parseInt(req.params.id);

UserDAO.deleteUser(user_id)
.then((user)=>{

res.status(200).send({ status: 'success',message:[]	 });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});

module.exports = router;

var express = require('express');
var UserDAO=require('../models/userdao');
var router = express.Router();


router.get('/',function(req,res,next){
var id=parseInt(req.params.id);
UserDAO.getAll()
.then((users)=>{
res.send(users);

});
});


router.get('/:id',function(req,res,next){
var id=parseInt(req.params.id);
UserDAO.getById(id)
.then((user)=>{
res.send(user);
res.sendStatus(200);
});
});



router.post('/', function(req, res) {
    var user_name = req.body.user.name;
    var user_email = req.body.user.email;
    var user_alliance_id = req.body.user.alliance_id;

	UserDAO.insertUser(user_name,user_email,user_alliance_id);
res.sendStatus(200);
});
module.exports = router;

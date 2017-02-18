var express = require('express');
var AllianceDAO=require('../models/alliancedao');
var router = express.Router();


router.get('/',function(req,res,next){

AllianceDAO.getAll()
.then((alliances)=>{
res.status(200).send({ status: 'success', alliances: alliances });
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
AllianceDAO.getById(id)
.then((alliance)=>{
res.status(200).send({ status: 'success', alliance: alliance });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});



router.post('/', function(req, res) {
    var alliance_name = req.body.alliance.name;


AllianceDAO.insertAlliance(alliance_name)
.then((alliance)=>{

res.status(200).send({ status: 'success',message:'Inserted one alliance', alliance: alliance });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});


router.put('/:id', function(req, res) {
	var alliance_id=parseInt(req.params.id);
    var alliance_name = req.body.alliance.name;


AllianceDAO.updateAlliance(alliance_id,alliance_name)
.then((alliance)=>{

res.status(200).send({ status: 'success',message:'modified a alliance', alliance: alliance });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});

router.delete('/:id', function(req, res) {
	var alliance_id=parseInt(req.params.id);

AllianceDAO.deleteAlliance(alliance_id)
.then((alliance)=>{

res.status(200).send({ status: 'success',message:[]	 });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});
  ///////////////////////////////////////////////////////////////////
 //////////////////////// ROUTES AVANCEES //////////////////////////
///////////////////////////////////////////////////////////////////
router.get('/:id/users',function(req,res,next){
var id=parseInt(req.params.id);
AllianceDAO.getUsersOfTheAlliance(id)
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

router.get('/:id/characters',function(req,res,next){
var id=parseInt(req.params.id);
AllianceDAO.getCharactersOfTheAlliance(id)
.then((characters)=>{
res.status(200).send({ status: 'success', characters: characters });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});

router.get('/:id/characters/:class',function(req,res,next){
var _class=req.params.class;
var id=parseInt(req.params.id);
AllianceDAO.getCharactersByAllianceAndClass(id,_class)
.then((characters)=>{
res.status(200).send({ status: 'success', characters: characters });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});





module.exports = router;

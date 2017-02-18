var express = require('express');
var CharacterDAO=require('../models/characterdao');
var router = express.Router();


router.get('/',function(req,res,next){
CharacterDAO.getAll()
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


router.get('/:id',function(req,res,next){
var id=parseInt(req.params.id);
CharacterDAO.getById(id)
.then((character)=>{
res.status(200).send({ status: 'success', character: character });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));
});



router.post('/', function(req, res) {
    var character_name = req.body.character.name;
    var user_id = req.body.character.user_id;
    var character_class = req.body.character.class;
    var character_positionX = req.body.character.position.x;
	var character_positionY = req.body.character.position.y;

CharacterDAO.insertCharacter(character_name,user_id,character_class,character_positionX,character_positionY)
.then((character)=>{

res.status(200).send({ status: 'success',message:'Inserted one character', character: character });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});


router.put('/:id', function(req, res) {
	var character_id=parseInt(req.params.id);
    var character_name = req.body.character.name;
    var user_id = req.body.character.user_id;
    var character_class = req.body.character.class;
    var character_positionX = req.body.character.position.x;
	var character_positionY = req.body.character.position.y;

CharacterDAO.updateCharacter(character_id,character_name,user_id,character_class,character_positionX,character_positionY)
.then((character)=>{

res.status(200).send({ status: 'success',message:'modified a character', character: character });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});

router.delete('/:id', function(req, res) {
	var character_id=parseInt(req.params.id);

CharacterDAO.deleteCharacter(character_id)
.then((character)=>{

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
router.get('/all/:class',function(req,res,next){
var _class=req.params.class;
CharacterDAO.getCharactersByClass(_class)
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


router.get('/:id/allies/:radius',function(req,res,next){
var radius=req.params.radius;
var id=parseInt(req.params.id);
CharacterDAO.getAlliesRadius(id,radius)
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

router.get('/:id/ennemies/:radius',function(req,res,next){
var radius=req.params.radius;
var id=parseInt(req.params.id);
CharacterDAO.getEnnemiesRadius(id,radius)
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

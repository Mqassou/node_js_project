var express = require('express');
var AllianceDAO=require('../models/alliancedao');
var router = express.Router();


router.get('/',function(req,res,next){
var id=parseInt(req.params.id);
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

res.status(200).send({ status: 'success',message:'modified an alliance', alliance: alliance });
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

res.status(200).send({ status: 'success',message:'deleted an alliance' });
})
.catch((error)=>
	res.status(500)
		.json({
			status:'Error',
			message:error
			}));

});

module.exports = router;

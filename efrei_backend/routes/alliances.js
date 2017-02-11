var express = require('express');
var AllianceDAO=require('../models/alliancedao');
var router = express.Router();


router.get('/',function(req,res,next){
var id=parseInt(req.params.id);
AllianceDAO.getAll()
.then((alliances)=>{
res.send(alliances);

});
});


router.get('/:id',function(req,res,next){
var id=parseInt(req.params.id);
AllianceDAO.getById(id)
.then((allicance)=>{
res.send(alliance);
res.sendStatus(200);
});
});



router.post('/', function(req, res) {
    var alliance_name = req.body.alliance.name;

	AllianceDAO.createAlliance(alliance_name);
res.sendStatus(200);
});

router.delete('/:id', function(req, res){
var id= parrseInt(req.params.id); 
AllianceDAO.deleteAlliance(id)
.then((alliance)=>{
    res.send(alliance); 
    res.sendStatus(200); 
});
}); 

router.put('/:id', function(req, res){
    var alliance_name = req.body.alliance.name; 
	var alliance_id=	req.body.alliance.id;
    AllianceDAO.updateAlliance(alliance_name,alliance_id)
    .then((alliance)=>{
        res.send(alliance); 
        res.sendStatus(200); 
    });
});

module.exports = router
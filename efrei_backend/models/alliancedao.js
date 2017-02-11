const DB =require('../models/database');

module.exports={
getById(id){
console.log('valeur de l\'id ' +id);
return DB.query('SELECT * FROM alliances WHERE id=$[idAlliance]', {
    idAlliance: id
	})
	.then((result)=>
	{
	console.log('result' +result);
	return result
	})
	
	
},
getAll(){
return DB.query('SELECT * FROM alliances')
	.then((result)=>{
	return result
	})
	.catch((error)=>{
	throw error
	})
},   


createAlliance(name){
    return DB.query('INSERT INTO alliances (id,name) VALUES($[nameAlliance])',{
        nameAlliance : name
    })
    .catch((error)=>{
        throw error
    })
},

deleteAlliance(id){
	return DB.query('DELETE FROM alliances WHERE id=$[idAlliance]',{
		idAlliance : id
	})
	.catch((error)=>{
		throw error
	}) 
},

updateAlliance(name, id){
	return DB.query('UPDATE alliances SET name=$[nameAlliance] WHERE id=$[idAlliance]', {
		nameAlliance : name, 
		idAlliance : id
	})
}

}
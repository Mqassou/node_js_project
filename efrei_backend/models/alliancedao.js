const DB =require('../models/Database');

module.exports={
getById(id){

return DB.accessor.query('SELECT * FROM alliances WHERE id=$[idAlliance]', {
    idAlliance: id
	})
	.then((result)=>
	{
	result=result[0];
	return result
	})
	.catch((error)=>{
	throw error
	})
	
	
},
getAll(){
return DB.accessor.query('SELECT * FROM alliances')
	.then((result)=>{
 
	return result
	})
	.catch((error)=>{
	throw error
	})


},

insertAlliance(name)
{
return DB.accessor.query('INSERT INTO alliances (name) VALUES(${alliance_name}) RETURNING *', {
	alliance_name:name
	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},

updateAlliance(id,name)
{
return DB.accessor.query('UPDATE  alliances SET name=${alliance_name} WHERE id =${alliance_id} RETURNING *', {
	alliance_id:id,
	alliance_name:name

	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},
deleteAlliance(id)
{
return DB.accessor.query('DELETE FROM alliances WHERE id =${alliance_id} ', {
	alliance_id:id

	})
	.catch((error)=>{
	throw error
	})
	

},

  ///////////////////////////////////////////////////////////////////
 //////////////////////// ROUTES AVANCEES //////////////////////////
///////////////////////////////////////////////////////////////////
getUsersOfTheAlliance(id){

return DB.accessor.query('SELECT * FROM USERS WHERE alliance_id=$[idAlliance]  ', {
    idAlliance: id
	})
	.then((result)=>
	{
	
	return result
	})
	.catch((error)=>{
	throw error
	})
	
	
},

getCharactersOfTheAlliance(id){

return DB.accessor.query('SELECT C.id, C.name, C.user_id, C.class, C.position FROM CHARACTERS C LEFT JOIN  USERS U on C.user_id=U.id WHERE U.alliance_id=$[idAlliance]  ', {
    idAlliance: id
	})
	.then((result)=>
	{
	
	return result
	})
	.catch((error)=>{
	throw error
	})
	
	
},

getCharactersByAllianceAndClass(id,_class){

return DB.accessor.query('SELECT C.id, C.name, C.user_id, C.class, C.position FROM CHARACTERS C LEFT JOIN  USERS U on C.user_id=U.id WHERE U.alliance_id=$[idAlliance] AND C.class=$[character_class]  ', {
    idAlliance: id,
	character_class:_class
	})
	.then((result)=>
	{
	
	return result
	})
	.catch((error)=>{
	throw error
	})
	
	
}

}


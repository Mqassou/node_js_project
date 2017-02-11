const DB =require('../models/Database');

module.exports={
getById(id){

return DB.accessor.query('SELECT * FROM characters WHERE id=$[idCharacter]', {
    idCharacter: id
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
return DB.accessor.query('SELECT * FROM characters')
	.then((result)=>{

	return result
	})
	.catch((error)=>{
	throw error
	})


},

insertCharacter(name,idUser,_class,positionX,positionY)
{
return DB.accessor.query('INSERT INTO characters (name,user_id,class,position) VALUES(${character_name},${user_id},${character_class},point(${character_positionX},${character_positionY})) RETURNING *', {
	character_name:name,
	user_id:idUser,
    character_class: _class,
	character_positionX:positionX,
	character_positionY:positionY
	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},

updateCharacter(id,name,idUser,_class,positionX,positionY)
{
return DB.accessor.query('UPDATE  characters SET name=${character_name}, user_id=${user_id},class=${character_class},position=point(${character_positionX},${character_positionY}) WHERE id =${character_id} RETURNING *', {
	character_id:id,
	character_name:name,
	user_id:idUser,
    character_class: _class,
	character_positionX:positionX,
	character_positionY:positionY
	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},
deleteCharacter(id)
{
return DB.accessor.query('DELETE FROM characters WHERE id =${character_id} ', {
	character_id:id

	})
	.catch((error)=>{
	throw error
	})
	

}
}


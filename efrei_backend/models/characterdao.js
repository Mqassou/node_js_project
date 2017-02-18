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
	

},
  ///////////////////////////////////////////////////////////////////
 //////////////////////// ROUTES AVANCEES //////////////////////////
///////////////////////////////////////////////////////////////////
getCharactersByClass(_class)
{
return DB.accessor.query('SELECT * FROM CHARACTERS WHERE class =${character_class} ', {
	character_class:_class

	})
	.catch((error)=>{
	throw error
	})
	

},

getAlliesRadius(id,_radius)
{
// earth radius : 6371 km
return DB.accessor.query('SELECT id,name,user_id,class,position  FROM ( SELECT C.id,C.name,C.user_id,C.class,C.position , (acos((sin(radians((SELECT position[0] FROM CHARACTERS WHERE id=${character_id})))*sin(radians(position[0])) ) + (cos(radians((SELECT position[0] FROM CHARACTERS WHERE id=${character_id}))) *cos(radians(position[0]))*cos(radians(position[1])-radians((SELECT position[1] FROM CHARACTERS WHERE id=${character_id}))) )) * 6371000) As D    FROM   CHARACTERS C LEFT JOIN  USERS U  on C.user_id=U.id  WHERE U.alliance_id=(SELECT alliance_id FROM USERS U LEFT JOIN CHARACTERS C ON C.user_id=U.id  WHERE C.id=${character_id})	  )as t  WHERE t.D<${radius} and t.id!=${character_id} ', {
	character_id:id,
	radius:_radius
	})
	.catch((error)=>{
	throw error
	})
},

getEnnemiesRadius(id,_radius)
{
return DB.accessor.query('SELECT id,name,user_id,class,position  FROM ( SELECT C.id,C.name,C.user_id,C.class,C.position , (acos((sin(radians((SELECT position[0] FROM CHARACTERS WHERE id=${character_id})))*sin(radians(position[0])) ) + (cos(radians((SELECT position[0] FROM CHARACTERS WHERE id=${character_id}))) *cos(radians(position[0]))*cos(radians(position[1])-radians((SELECT position[1] FROM CHARACTERS WHERE id=${character_id}))) )) * 6371000) As D    FROM   CHARACTERS C LEFT JOIN  USERS U  on C.user_id=U.id  WHERE U.alliance_id!=(SELECT alliance_id FROM USERS U LEFT JOIN CHARACTERS C ON C.user_id=U.id  WHERE C.id=${character_id})	  )as t  WHERE t.D<${radius} and t.id!=${character_id} ORDER BY t.D',{
	character_id:id,
	radius:_radius

	})
	.catch((error)=>{
	throw error
	 })
}


}


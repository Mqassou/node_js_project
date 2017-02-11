const DB =require('../models/Database');

module.exports={
getById(id){

return DB.accessor.query('SELECT * FROM users WHERE id=$[idAlliance]', {
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
getAll(){
return DB.accessor.query('SELECT * FROM users')
	.then((result)=>{
	return result
	})
	.catch((error)=>{
	throw error
	})


},

insertUser(name,email,alliance_id)
{
return DB.accessor.query('INSERT INTO users (name,email,alliance_id) VALUES(${user_name},${user_email},${idAlliance}) RETURNING *', {
	user_name:name,
	user_email:email,
    idAlliance: alliance_id
	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},

updateUser(id,name,email,alliance_id)
{
return DB.accessor.query('UPDATE  users SET name=${user_name}, email=${user_email},alliance_id=${idAlliance} WHERE id =${user_id} RETURNING *', {
	user_id:id,
	user_name:name,
	user_email:email,
    idAlliance: alliance_id
	})
	.then((result)=>{
	result=result[0];// pour enlever les crochets
	return result
	})
	.catch((error)=>{
	throw error
	})
	

},
deleteUser(id)
{
return DB.accessor.query('DELETE FROM users WHERE id =${user_id} ', {
	user_id:id

	})
	.catch((error)=>{
	throw error
	})
	

}
}


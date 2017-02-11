const DB =require('../models/database');

module.exports={
getById(id){

return DB.query('SELECT * FROM users WHERE id=$[idAlliance]', {
    idAlliance: id
	})
	.then((result)=>
	{
	
	return result
	})
	
	
},
getAll(){
return DB.query('SELECT * FROM users')
	.then((result)=>{
	return result
	})
	.catch((error)=>{
	throw error
	})


},

insertUser(name,email,alliance_id)
{
DB.query('INSERT INTO users (name,email,alliance_id) VALUES(${user_name},${user_email},${idAlliance}) RETURNING *', {
	user_name:name,
	user_email:email,
    idAlliance: alliance_id
	})
	.then((result)=>{
	console.log('INSERTUSER  :%j ',result);
	return result
	})
	.catch((error)=>{
	throw error
	})
	

}
}

/*

{"user":
{
"name":"Mohamed",
"email":"mohamed@gmail.fr",
"alliance_id":1
}
}

*/
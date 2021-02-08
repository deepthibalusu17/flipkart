//require necessary models
const db = require('../models');
const Person = db.Person;
const Movie = db.Movie;

// Person create controller
exports.create = async (req,res) => {
	console.log('hi')
	try {
		//validation
		if(!req.body.name) throw `person's name is required!`;
		//creating a Person entry
		const result = await Person.create({
			name:req.body.name,
			bio:req.body.bio,
			birth_date:new Date(
				req.body.birth_date.substring(0, 4),
				parseInt(req.body.birth_date.substring(5, 7))-1,
				parseInt(req.body.birth_date.substring(8, 10))+1
				).toISOString(),
			roles:typeof req.body.roles==='string'?req.body.roles.split(','):req.body.roles,
			birth_place:req.body.birth_place,
			person_image:req.body.person_image,
			additional_details:typeof req.body.additional_details==='string'?req.body.additional_details.split(','):req.body.additional_details,
			search_tags:typeof req.body.search_tags==='string'?req.body.search_tags.split(','):req.body.search_tags
		});
		//sending response
		res.status(200).json({
			message:'Added new Person!.',
			data:result
		});
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a Person',
			error:e
		});
	}
}
//fetch all Persons
exports.findAllPersons = async (req,res) => {
	try {
		let result= await Person.findAll({
			where:req.query.name?{name:req.query.name}:null
		});

		result = result.map((actor,index)=>{
			return{
				id:actor.id,
				name:actor.name,
				birth_date:actor.birth_date,
				roles:actor.roles,
				birth_place:actor.birth_place,
			}
		})

		res.status(200).json({
			message:`All Persons whose name matches ${req.query.name}!.`,
			data:result
		});
	} catch(e) {
		console.log(e);
		res.send({
			message:`Some error occured while finding a Person with name ${req.query.name}`,
			error:e
		});
	}
}
//fetch a signle Person by id
exports.findOne = async (req,res) => {
	try {
		let result= await Person.findOne({where:{id:req.params.id},include: ['movie_person']});

		let actedIn=[];
		for(let j=0;j<result.movie_person.length;j++){
			if(result.movie_person[j].movieId===null) continue;
			let movieName = await Movie.findOne({where:{id:result.movie_person[j].movieId},attributes:['movie_title']});
			movieName=movieName.movie_title;
			actedIn.push({
				movie:movieName,
				role:result.movie_person[j].role,
				characterName:result.movie_person[j].character_name
			})
		}

		result = {
			id:result.id,
			name:result.name,
			bio:result.bio,
			birth_date:result.birth_date,
			roles:result.roles,
			birth_place:result.birth_place,
			additional_details:result.additional_details,
			search_tags:result.search_tags,
			casted_in:actedIn
		}

		res.status(200).json({
			message:`${result.name} details!.`,
			data:result
		});
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a Person',
			error:e
		});
	}
}
//update a Person
exports.update = async (req,res) => {
	try {
		console.log(req.params.id)
		const result= await Person.update(req.body,{where:{id:req.params.id}});
		if(result){
			res.status(200).json({
				message:`Succesfully updated Person with id ${req.params.id}.`,
			});
		}else throw 'Oops!.. could not update!.'
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while updating a Person',
			error:e
		});
	}	
}

exports.delete = async (req,res) => {
	try {
		console.log(req.params.id)
		const result= await Person.destroy({where:{id:req.params.id}});
		if(result){
			res.status(200).json({
				message:`Succesfully deleted Person with id ${req.params.id}.`,
			});
		}else throw 'Oops!.. could not delete!.'
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while deleting a Person',
			error:e
		});
	}	
}
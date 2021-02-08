const db = require('../models');
const Movie_person = db.Movie_person;
// add a movie to actor relation
exports.addMovieToPersonRelation = async (req,res)=>{
	try {
		if(!req.body.movieId || !req.body.personId) throw 'movie_id and person_id are required';
		let result = await Movie_person.create({
			movieId:req.body.movieId,
			personId:req.body.personId,
			role:req.body.role,
			character_name:req.body.character_name
		})
		res.status(200).json({
			message:'Added new movie to person relation!.',
			data:result
		});
	} catch(e) {
		console.log(e);
		res.json({
			message:'Some error occured while adding a Person',
			error:e
		});
	}
}

//fetch all Persons
exports.findAllRelations = async (req,res) => {
	try {
		const result= await Movie_person.findAll();
		res.status(200).json({
			message:`All Persons to movies relations!.`,
			data:result
		});
	} catch(e) {
		console.log(e);
		res.send({
			message:`Some error occured while finding a Person to movie relations`,
			error:e
		});
	}
}
//delete a relation
exports.deleteRelation = async (req,res) => {
	try {
		const result= await Movie_person.destroy({where:{id:req.params.id}});
		if(result){
			res.status(200).json({
				message:`Succesfully deleted relation with id ${req.params.id}.`,
			});
		}else throw 'Oops!.. could not delete!.'
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while deleting a relation',
			error:e
		});
	}	
}
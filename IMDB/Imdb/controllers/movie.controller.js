//require necessary models
const db = require('../models');
const Movie = db.Movie;
const Person = db.Person;

// movie create controller
exports.create = async (req,res) => {
	try {
		//validation
		if(!req.body.movie_title) throw 'movie title is required!';
		//creating a movie entry
		const result = await Movie.create({
			movie_title:req.body.movie_title,
			movie_description:req.body.movie_description,
			movie_rating:req.body.movie_rating,
			movie_release_date:new Date(
				req.body.movie_release_date.substring(0, 4),
				parseInt(req.body.movie_release_date.substring(5, 7))-1,
				parseInt(req.body.movie_release_date.substring(8, 10))+1
				).toISOString(),
			movie_genre:typeof req.body.movie_genre==='string'?req.body.movie_genre.split(','):req.body.movie_genre,
			movie_duration:req.body.movie_duration,
			movie_content_type:req.body.movie_content_type,
			search_tags:typeof req.body.search_tags==='string'?req.body.search_tags.split(','):req.body.search_tags
		});
		//sending response
		res.status(200).json({
			message:'Added new movie!.',
			data:result
		});
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a movie',
			error:e
		});
	}
}
//fetch all movies
exports.findAllMovies = async (req,res) => {
	try {
		let result= await Movie.findAll({
			where:req.query.title?{movie_title:req.query.title}:null,
			include: ['movie_person']
		});

		result = result.map((movie,index)=>{
			return{
				id:movie.id,
				title:movie.movie_title,
				rating:movie.movie_rating,
				release_date:movie.movie_release_date,
				genre:movie.movie_genre,
				movie_duration:movie.movie_duration,
				content_type:movie.movie_content_type,
			}
		})

		res.status(200).json({
			message:'All movies!.',
			data:result
		});
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a movie',
			error:e
		});
	}
}
//fetch a signle movie by id
exports.findOne = async (req,res) => {
	try {
		let result= await Movie.findOne({where:{id:req.params.id},include: ['movie_person']});

		let cast=[];
		for(let j=0;j<result.movie_person.length;j++){
			if(result.movie_person.personId===null) continue;
			let name = await Person.findOne({where:{id:result.movie_person[j].personId},attributes:['name']});
			if(!name) continue;
			name=name.name;
			cast.push({
				name,
				role:result.movie_person[j].role,
				characterName:result.movie_person[j].character_name
			})
		}
		//making respnse look clean
		result = {
			id:result.id,
			title:result.movie_title,
			description:result.movie_description,
			rating:result.movie_rating,
			release_date:result.movie_release_date,
			genre:result.movie_genre,
			movie_duration:result.movie_duration,
			content_type:result.movie_content_type,
			cast:cast
		}
		//sending response
		res.status(200).json({
			message:`${result.title} details!.`,
			data:result
		});
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a movie',
			error:e
		});
	}
}
//update a movie
exports.update = async (req,res) => {
	try {
		console.log(req.params.id)
		const result= await Movie.update(req.body,{where:{id:req.params.id}});
		if(result){
			res.status(200).json({
				message:`Succesfully updated movie with id ${req.params.id}.`,
			});
		}else throw 'Oops!.. could not update!.'
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while updating a movie',
			error:e
		});
	}	
}

exports.delete = async (req,res) => {
	try {
		console.log(req.params.id)
		const result= await Movie.destroy({where:{id:req.params.id}});
		if(result){
			res.status(200).json({
				message:`Succesfully deleted movie with id ${req.params.id}.`,
			});
		}else throw 'Oops!.. could not delete!.'
	} catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while deleting a movie',
			error:e
		});
	}	
}
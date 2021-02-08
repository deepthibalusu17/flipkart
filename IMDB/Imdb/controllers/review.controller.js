const db = require('../models');
const Review =  db.Review; 
const Movie =  db.Movie;
const User =  db.User; 

exports.create = async (req,res)=>{
	try{
		const {movieId,rating,comment} = req.body;
		let result = await Review.create({
			movieId,
			rating,
			comment,
			userId:req.user.id
		})

		res.status(200).json({
			message:'added a review on movie',
			body:result
		})
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a review',
			error:e
		});
	}
}

exports.getReviewsByMovie = async (req,res)=>{
	try {
		let condition=!req.params.id?null:{movieId:req.params.id}
		let result = await Review.findAll({where:condition});
		let authorNames=[];
		for(let i=0;i<result.length;i++){
			let authorName = await User.findOne({where:{id:result[i].userId},attributes:['userName']});
			authorNames.push(authorName.userName);
		}
		res.status(200).json({
			message:'reviews on a movie',
			body:result.map((res,i)=>{
				return{
					id:res.id,
					author:authorNames[i],
					rating:res.rating,
					comment:res.comment
				}
			})
		})
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while fetching reviews',
			error:e
		});
	}
}

exports.getReviewsOfUser = async (req,res)=>{
	try {
		let result = await Review.findAll({where:{userId:req.user.id}});
		let movieNames=[];
		for(let i=0;i<result.length;i++){
			let movieName = await Movie.findOne({where:{id:result[i].movieId},attributes:['movie_title']});
			movieNames.push(movieName.movie_title);
		}
		res.status(200).json({
			message:`reviews given by ${req.user.userName} `,
			body:result.map((res,i)=>{
				return{
					id:res.id,
					movieName:movieNames[i],
					rating:res.rating,
					comment:res.comment
				}
			})
		})
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while fetching reviews',
			error:e
		});
	}
}
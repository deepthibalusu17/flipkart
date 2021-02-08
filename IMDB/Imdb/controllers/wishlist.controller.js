const db = require('../models');
const Movie = db.Movie;
const User = db.User;

exports.addToWishlist = async (req,res)=>{
	try {
		let user = await User.findOne({where:{id:req.user.id},attributes:['wishlist']});
		let wishlist=user.wishlist===null?[]:user.wishlist;
		wishlist=[...wishlist,req.params.movieId];
		let result = User.update({wishlist},{where:{id:req.user.id}});

		res.status(200).json({
			message:'added movie to wishlist!.'
		})
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while adding a movie to wishlist',
			error:e
		});
	}
}

exports.getWishlist = async (req,res)=>{
	try {
		let user = await User.findOne({where:{id:req.user.id},attributes:['wishlist']});
		let wishlist=user.wishlist===null?[]:user.wishlist;
		let movies=[];
		for(let i=0;i<wishlist.length;i++){
			let movie = await Movie.findByPk(wishlist[i]);
			movies.push({
				id:movie.id,
				title:movie.movie_title,
				rating:movie.movie_rating,
				duration:movie.movie_duration
			});
		}
		res.status(200).json({
			message:`${req.user.userName}'s wishlist`,
			body:movies
		})

	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while fetching wishlist',
			error:e
		});
	}
}


exports.deleteFromWishlist = async (req,res)=>{
	try {
		let user = await User.findOne({where:{id:req.user.id},attributes:['wishlist']});
		let wishlist=user.wishlist===null?[]:user.wishlist;
		wishlist=wishlist.filter(movie=>{
			console.log(movie,req.params.movieId)
			if(movie==req.params.movieId){
				return false
			}
			else{
				return true
			}
		})
		let result = User.update({wishlist},{where:{id:req.user.id}});
		res.status(200).json({
			message:'deleted movie from wishlist!.'
		})
	}catch(e) {
		console.log(e);
		res.send({
			message:'Some error occured while deleting a movie from wishlist',
			error:e
		});
	}
}


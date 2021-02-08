const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models');
const User = db.User;
require('dotenv').config();
// user regiestration
exports.register = async (req,res)=>{
	try{
		//validation
		let err = [];
		if(!req.body.userName) err.push('userName is required!');
		if(!req.body.password) err.push('password is required!');
		if(req.body.userName<6 || req.body.password<6) err.push('password and userName should be grater than 6 letters!');
		if(req.body.password!==req.body.retypePassword) err.push('passwords dosnt match!');
		let duplicateUser = await User.findOne({where:{userName:req.body.userName}});
		if(duplicateUser) err.push('user with this userName already exists');
		if(err.length) throw err;

		// encrypting password
		let salt = await bcrypt.genSalt(10);
		let password = await bcrypt.hash(req.body.password,salt); 
		
		//create a new user
		let user = await User.create({
			userName:req.body.userName,
			password
		})

		res.status(200).json({
			message:`${user.userName} is succesfully registered! please login`,
			body:user
		})

	}catch(e){
		console.log(e);
		res.json({
			message:'error occured during user registration!.',
			error:e
		})
	}
}
//user login
exports.userLogin = async (req,res)=>{
	try {
		//find and compare user details
		let UserFound = await User.findOne({where:{userName:req.body.userName}});
		if(!UserFound) throw 'invalid username';
		let isvalidPassword = await bcrypt.compare(req.body.password,UserFound.password);
		if(!isvalidPassword) throw 'incorrect password';

		//signing in user
		const token = jwt.sign({
			id:UserFound.id,
			userName:UserFound.userName
		},process.env.AUTH_KEY)

		//send response
		res.status(200).json({
			message:'logged in sucessfuly!',
			token
		})

	} catch(e) {
		console.log(e);
		res.json({
			message:'error occured during user login!.',
			error:e
		})
	}
}
//admin login
exports.adminLogin = async (req,res)=>{
	try {
		//find and compare user details
		if(req.body.userName!==process.env.ADMIN_USERNAME) throw 'invalid username';
		if(req.body.password!==process.env.ADMIN_PASSWORD) throw 'incorrect password';
		//signing in user
		const token = jwt.sign({
			userName:req.body.userName
		},process.env.AUTH_KEY)

		//send response
		res.status(200).json({
			message:'admin logged in sucessfuly!',
			token
		})

	} catch(e) {
		console.log(e);
		res.json({
			message:'error occured during admin login!.',
			error:e
		})
	}
}
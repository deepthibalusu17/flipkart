const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyLoginUser = async (req,res,next)=>{
	try {
		//check header
		let token = req.header('user-token');
		if(!token) throw 'acess denied!';
		//verify token
		let verify = jwt.verify(token,process.env.AUTH_KEY);
		if(!verify) throw 'invalid user token';
		req.user=verify;
		next();
	}catch(e){
		res.json({
			message:e
		})
	}
}

exports.verifyLoginAdmin = async (req,res,next)=>{
	try {
		//check header
		let token = req.header('admin-token');
		if(!token) throw 'acess denied! you should be an admin to acess this.';
		//verify token
		let verify = jwt.verify(token,process.env.AUTH_KEY);
		if(!verify) throw 'invalid admin token';
		req.admin=verify;
		next();
	}catch(e){
		res.json({
			message:e
		})
	}
}
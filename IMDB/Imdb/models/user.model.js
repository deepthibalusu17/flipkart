module.exports = (sequelize,Sequelize) => {
	const User = sequelize.define('user',{
		userName:{
			type:Sequelize.STRING,
			allowNull:false
		},
		password:{
			type:Sequelize.STRING,
			allowNull:false
		},
		user_image:{
			type:Sequelize.STRING
		},
		wishlist:{
			type:Sequelize.ARRAY(Sequelize.INTEGER)
		}
	});
	return User;
}
module.exports = (sequelize,Sequelize) => {
	const Movie_person = sequelize.define('movie_person',{
		role:{
			type:Sequelize.STRING
		},
		character_name:{
			type:Sequelize.STRING	
		}
	});
	return Movie_person;
}
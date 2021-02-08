//importing config and sequelize
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');
//connecting to sequelize
const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
	host:dbConfig.HOST,
	dialect:dbConfig.dialect,
	pool:{
		min:dbConfig.pool.min,
		max:dbConfig.pool.max,
		acquire:dbConfig.pool.acquire,
		idle:dbConfig.pool.acquire
	}
});
//importing all models
const Movie=require('./movie.model')(sequelize,Sequelize);
const Person=require('./person.model')(sequelize,Sequelize);
const Movie_person=require('./movie_person.model')(sequelize,Sequelize);
const User=require('./user.model')(sequelize,Sequelize);
const Review=require('./review.model')(sequelize,Sequelize); 
//crating relations between tables
Movie.hasMany(Movie_person , {as:"movie_person"});
Movie_person.belongsTo(Movie, {
  foreignKey: "movieId",
  as:"movie"
});

Person.hasMany(Movie_person, {as:"movie_person"});
Movie_person.belongsTo(Person, {
	foreignKey:"personId",
	as:"person"
});

Movie.hasMany(Review, {as:"review"});
Review.belongsTo(Movie,{
	foreignKey:"movieId",
	as:"movie"
});

User.hasMany(Review, {as:"review"});
Review.belongsTo(User,{
	foreignKey:"userId",
	as:"user"
})
//exporting all models
module.exports = {
	Sequelize,
	sequelize,
	Movie,
	Person,
	Movie_person,
	User,
	Review
}
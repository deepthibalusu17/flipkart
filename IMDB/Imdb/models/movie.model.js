module.exports = (sequelize,Sequelize) => {
	const Movie = sequelize.define('movie',{
		movie_title:{
			type:Sequelize.STRING,
			allowNull:false
		},
		movie_description:{
			type:Sequelize.TEXT
		},
		movie_rating:{
			type:Sequelize.DECIMAL(10,1)
		},
		movie_release_date:{
			type:Sequelize.DATE
		},
		movie_genre:{
			type:Sequelize.ARRAY(Sequelize.STRING)
		},
		movie_duration:{
			type:Sequelize.STRING
		},
		movie_cover:{
			type:Sequelize.STRING
		},
		movie_content_type:{
			type:Sequelize.STRING
		},
		search_tags:{
			type:Sequelize.ARRAY(Sequelize.STRING)
		}
	});
	return Movie;
}
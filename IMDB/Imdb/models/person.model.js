module.exports = (sequelize,Sequelize) => {
	const Person = sequelize.define('person',{
		name:{
			type:Sequelize.STRING,
			allowNull:false
		},
		bio:{
			type:Sequelize.TEXT
		},
		birth_date:{
			type:Sequelize.DATE
		},
		roles:{
			type:Sequelize.ARRAY(Sequelize.STRING)
		},
		birth_place:{
			type:Sequelize.STRING
		},
		person_image:{
			type:Sequelize.STRING
		},
		additional_details:{
			type:Sequelize.ARRAY(Sequelize.TEXT)
		},
		search_tags:{
			type:Sequelize.ARRAY(Sequelize.STRING)
		}
	});
	return Person;
}
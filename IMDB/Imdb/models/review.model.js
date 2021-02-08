module.exports = (sequelize,Sequelize)=>{
	return sequelize.define('review',{
		rating:{
			type:Sequelize.DECIMAL(10,1),
			notNull:true
		},
		comment:{
			type:Sequelize.TEXT
		}
	})
}
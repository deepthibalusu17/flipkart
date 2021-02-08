const Router = require('express').Router();
const controller = require('../controllers/movie_person.controller');
const {verifyLoginAdmin} = require('../middleware/verifyLogin');

Router.post('/create',verifyLoginAdmin,controller.addMovieToPersonRelation);
Router.get('/',verifyLoginAdmin,controller.findAllRelations);
Router.delete('/delete/:id',verifyLoginAdmin,controller.deleteRelation);

module.exports = Router;
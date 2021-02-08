const Router = require('express').Router();
const controller = require('../controllers/movie.controller');
const {verifyLoginAdmin} = require('../middleware/verifyLogin');

Router.post('/create',verifyLoginAdmin,controller.create);
Router.get('/',controller.findAllMovies);
Router.get('/:id',controller.findOne);
Router.patch('/update/:id',verifyLoginAdmin,controller.update);
Router.delete('/delete/:id',verifyLoginAdmin,controller.delete);

module.exports = Router;
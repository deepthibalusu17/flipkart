const Router = require('express').Router();
const controller = require('../controllers/person.controller');
const {verifyLoginAdmin} = require('../middleware/verifyLogin');

Router.post('/create',verifyLoginAdmin,controller.create);
Router.get('/',controller.findAllPersons);
Router.get('/:id',controller.findOne);
Router.patch('/update/:id',verifyLoginAdmin,controller.update);
Router.delete('/delete/:id',verifyLoginAdmin,controller.delete);

module.exports = Router;
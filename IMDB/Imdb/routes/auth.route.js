const Router = require('express').Router();
const controller = require('../controllers/auth.controller');

Router.post('/register',controller.register);
Router.post('/login',controller.userLogin);
Router.post('/admin/login',controller.adminLogin);
//Router.delete('/delete/:id',controller.deleteRelation);

module.exports = Router;
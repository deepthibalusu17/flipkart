const Router = require('express').Router();
const controller = require('../controllers/review.controller');
const {verifyLoginUser} = require('../middleware/verifyLogin');

Router.post('/create',verifyLoginUser,controller.create);
Router.get('/movie/:id',controller.getReviewsByMovie);
Router.get('/user',verifyLoginUser,controller.getReviewsOfUser);



module.exports = Router;
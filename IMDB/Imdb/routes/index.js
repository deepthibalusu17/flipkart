const Router = require('express').Router();

Router.use('/movies',require('./movie.route'));
Router.use('/person',require('./person.route'));
Router.use('/movie_person',require('./movie_person.route'));
Router.use('/auth',require('./auth.route'));
Router.use('/reviews',require('./review.route'));
Router.use('/wishlist',require('./wishlist.route'))

module.exports = Router;
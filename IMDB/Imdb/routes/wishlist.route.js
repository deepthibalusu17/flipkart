const Router = require('express').Router();
const controller = require('../controllers/wishlist.controller');
const {verifyLoginUser} = require('../middleware/verifyLogin');

Router.patch('/:movieId',verifyLoginUser,controller.addToWishlist);
Router.get('/',verifyLoginUser,controller.getWishlist);
Router.delete('/delete/:movieId',verifyLoginUser,controller.deleteFromWishlist);
module.exports = Router;

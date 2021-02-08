const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {


    Cart.findOne({ user: req.user._id })
       .exec((error, cart) => {
                if(error) return res.status(400).json({ error });
                if(cart)
                {
                          //if cart already exists then update cart by quantity
                const product = req.body.cartItems.product;
                const item = cart.cartItems.find(c => c.product == product);
                let condition, update;
                if(item)
                {
                    condition = { "user": req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: parseInt(item.quantity) + parseInt(req.body.cartItems.quantity)
                            } 
                        }
                    }; 
                }
                else
                {
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": req.body.cartItems
                        }
                    };
                }

                Cart.findOneAndUpdate(condition,update)
                .exec((error,_cart)=>{
                    if(error) return res.status(400).json({error});
                    if(_cart){
                        return res.status(201).json({cart:_cart});
                    }
                })
            }
                   else
                   {
                   const cart=new Cart({
                    user:req.user._id,
                    cartItems:[req.body.cartItems]
                    });
                cart.save((error,cart)=>{
                    if(error)return res.status(400).json({error});
                    if(cart){
                        return res.status(201).json({cart});
                    }
                });
            }
        });
    
                
 
};

   

exports.getCartItems = (req, res) => 
{
    //const { user } = req.body.payload;
    //if(user){
        Cart.findOne({ user: req.user._id })
        .populate('cartItems.product', '_id name price productPictures')
        .exec((error, cart) => {
            if(error) return res.status(400).json({ error });
            if(cart){
                let cartItems = {};
                cart.cartItems.forEach((item, index) => {
                    cartItems[item.product._id.toString()] = {
                        _id: item.product._id.toString(),
                        name: item.product.name,
                      //  img: item.product.productPictures[0].img,
                        price: item.product.price,
                        qty: item.quantity, 
                    }
                })
                res.status(200).json({ cartItems })
            }
        })
    //}
}

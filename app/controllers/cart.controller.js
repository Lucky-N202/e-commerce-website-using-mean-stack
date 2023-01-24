const Cart = require('../models/cart.model');

exports.addToCart = (req, res, next) => {
    const { productId, quantity, size, color, price } = req.body;
    const { userId } = req.params;

    const cart = new Cart({
        userId,
        items: [
            {
                productId,
                quantity,
                size,
                color,
                price
            }
        ],
        totalPrice: price * quantity
    });
    cart.save()
        .then(result => {
            res.status(201).json({
                message: 'Item added to cart',
                cart: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateCart = (req, res, next) => {
    const { productId, quantity, size, color, price } = req.body;
    const { userId } = req.params;

    Cart.findOne({ userId })
        .then(cart => {
            const itemIndex = cart.items.findIndex(item => item.productId === productId);
            if (itemIndex >= 0) {
                cart.items[itemIndex].quantity = quantity;
                cart.items[itemIndex].size = size;
                cart.items[itemIndex].color = color;
                cart.items[itemIndex].price = price;
            } else {
                cart.items.push({
                    productId,
                    quantity,
                    size,
                    color,
                    price
                });
            }
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            return cart.save();
        })
        .then(result => {
            res.status(200).json({
                    message: 'Cart updated',
                    cart: result
                    });
                    })
                    .catch(err => {
                    if (!err.statusCode) {
                    err.statusCode = 500;
                    }
                    next(err);
                    });
                    };
                    
                    exports.getCart = (req, res, next) => {
                    const { userId } = req.params;
                    Cart.findOne({ userId })
                    .then(cart => {
                    if (!cart) {
                    const error = new Error('No cart found');
                    error.statusCode = 404;
                    throw error;
                    }
                    res.status(200).json({
                    cart: cart
                    });
                    })
                    .catch(err => {
                    if (!err.statusCode) {
                    err.statusCode = 500;
                    }
                    next(err);
                    });
                };
const Order = require('../models/order.model');
const Product = require('../models/product.model');

exports.createOrder = (req, res, next) => {
    const order = new Order({
        user: req.user._id,
        products: req.body.products,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        totalPrice: req.body.totalPrice
    });
    order.save()
        .then(() => {
            // Update product stock
            req.body.products.forEach(product => {
                Product.updateOne({ _id: product.product }, { $inc: { stock: -product.quantity } })
                    .catch(error => res.status(500).json({ error }));
            });
            res.status(201).json({ message: 'Order created!' });
        })
        .catch(error => res.status(400).json({ error }));
};

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .populate('user')
        .populate('products.product')
        .then(orders => res.status(200).json(orders))
        .catch(error => res.status(500).json({ error }));
};

exports.getOneOrder = (req, res, next) => {
    Order.findById(req.params.id)
        .populate('user')
        .populate('products.product')
        .then(order => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(order);
        })
        .catch(error => res.status(500).json({ error }));
};

exports.updateOrder = (req, res, next) => {
    Order.updateOne({ _id: req.params.id }, req.body)
    .then(() => res.status(200).json({ message: 'Order updated!' }))
    .catch(error => res.status(400).json({ error }));
    };
    
exports.deleteOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Order deleted!' }))
    .catch(error => res.status(400).json({ error }));
};


exports.updateOrderStatus = (req, res, next) => {
    const orderId = req.params.id;
    const status = req.body.status;
    Order.updateOne({ _id: orderId }, { $set: { status: status } })
        .then(() => res.status(200).json({ message: 'Order status updated!' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOrderStatus = (req, res, next) => {
    const orderId = req.params.id;
    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json({ status: order.status });
        })
        .catch(error => res.status(500).json({ error }));
};


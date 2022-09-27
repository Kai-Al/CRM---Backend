const Order = require("../models/order.model.js");

exports.newOrder = async (req, res, next) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.json({mensaje: "New Order created"});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).populate('User').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate({_id: req.params.id}, req.body, {
            new: true
        }).populate('User').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete({_id: req.params.id});
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}
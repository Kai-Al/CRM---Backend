import Order, { find, findById, findOneAndUpdate, findByIdAndDelete } from "../models/order.model.js";

export async function newOrder(req, res, next) {
    const order = new Order(req.body);
    try {
        await order.save();
        res.json({mensaje: "New Order created"});
    } catch (error) {
        console.log(error);
        next();
    }
}

export async function getAllOrders(req, res, next) {
    try {
        const orders = await find({}).populate('User').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(orders);
    } catch (error) {
        console.log(error);
        next();
    }
}

export async function getOrder(req, res) {
    try {
        const order = await findById(req.params.id).populate('user').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}

export async function updateOrder(req, res) {
    try {
        const order = await findOneAndUpdate({_id: req.params.id}, req.body, {
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

export async function deleteOrder(req, res) {
    try {
        const order = await findByIdAndDelete({_id: req.params.id});
        res.json(order);
    } catch (error) {
        console.log(error);
    }
}
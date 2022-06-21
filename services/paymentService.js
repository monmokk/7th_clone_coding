const { Order } = require("../models");

const createOrder = async (order) => {
    return await Order.create(order);
}

module.exports = {
    createOrder
}
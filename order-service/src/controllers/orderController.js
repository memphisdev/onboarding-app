const { ITEM_PRICE } = require('../resources/constants');
const { logger } = require('../services/loggerService');

// Creating a model with Order as the object name and orderSchema as the Schema

/**
 * Place a new order
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const placeOrder = (req, res, next) => {
    let orderDetails = req.body;
    // calculate total amount
    orderDetails.total = orderDetails.items.reduce((currentTotal, item) => {
        return currentTotal + ITEM_PRICE[item.name]*item.quantity
    }, 0);
    console.log("---> Here is the order we received: ");
    console.log(orderDetails);
    req.stationServices.publishOrderToStation(orderDetails); 
    res.status(201).json(orderDetails);
}

module.exports = {
    placeOrder: placeOrder,
}
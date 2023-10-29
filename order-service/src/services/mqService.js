const { memphis } = require('memphis-dev');
const { logger } = require('./loggerService')
const MEMPHIS_HOST = process.env.MEMPHIS_HOST;
const MEMPHIS_USERNAME = process.env.MEMPHIS_USERNAME;
const MEMPHIS_PASSWORD = process.env.MEMPHIS_PASSWORD;
const MEMPHIS_ACCOUNTID = process.env.MEMPHIS_ACCOUNTID;
let orders_service_producer = null;

const memphisConnect = async () => {
    try {
        logger.info(`Memphis - trying to connect`)
        await memphis.connect({
            host: MEMPHIS_HOST,
            username: MEMPHIS_USERNAME,
            password: MEMPHIS_PASSWORD,
            accountId: MEMPHIS_ACCOUNTID
        });
        logger.info(`Memphis - connection established`)

        orders_service_producer = await memphis.producer({
            stationName: "orders",
            producerName: "orders_service",
        });
        logger.info(`orders_service producer created`)
    } catch(ex) {
        logger.log('fatal',`Memphis - ${ex}`);
        memphis.close();
        process.exit();
    }
}

/**
 * Publish order to station
 * @param {Object} order - order object containing order details
 */
const publishOrderToStation = (order) => {
    orders_service_producer.produce({message: Buffer.from(JSON.stringify(order))});
    logger.info(`---> The order has been forwarded to the restaurant.`);
}

/**
 * An express middleware for injecting queue services into the request object.
 * @param {Object} req - express request object.
 * @param {Object} res - express response object.
 * @param {Function} next - express next() function.
 */

 const injectPublishService = (req, res, next) => {
    // add all exchange operations here
    const stationServices = {
        publishOrderToStation: publishOrderToStation
    }
    // // inject exchangeServices in request object
    req.stationServices = stationServices;
    next();
}

module.exports = {
    injectPublishService: injectPublishService,
    memphisConnect: memphisConnect,
}

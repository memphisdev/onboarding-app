const { memphis } = require('memphis-dev');
const { sendConfirmation, sendNotificationViaEmail } = require('../controllers/emailController')
const { logger } = require('./loggerService')
const MEMPHIS_HOST = process.env.MEMPHIS_HOST;
const MEMPHIS_USERNAME = process.env.MEMPHIS_USERNAME;
const MEMPHIS_PASSWORD = process.env.MEMPHIS_PASSWORD;
const MEMPHIS_ACCOUNTID = process.env.MEMPHIS_ACCOUNTID;

/**
 * Connect to Memphis and consumer orders
 */
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
        
        ordersStation_consumer = await memphis.consumer({
            stationName: "orders",
            consumerName: "email_service",
        });
        logger.info(`email_service consumer from 'orders' station created`)

        deliveryStation_consumer = await memphis.consumer({
            stationName: "ready_to_deliver",
            consumerName: "email_service",
        });
        logger.info(`email_service consumer from 'ready_to_deliver' station created`)

        ordersStation_consumer.on("message", (order, context) => {
            // processing
            logger.info("---> Orders station: New order received by the restaurant. Notifying the customer.")
            logger.info(order.getData().toString())
            sendConfirmation(order);
        });

        deliveryStation_consumer.on("message", (notification, context) => {
            // processing
            logger.info("---> Ready_to_deliver station: An order is ready for delivery. Notifying the customer.")
            logger.info(notification.getData().toString())
            sendNotificationViaEmail(notification);
        });
    }
    catch (ex) {
        logger.log('fatal',`Memphis - ${ex}`);
        memphis.close();
        process.exit();
    }
}

module.exports = {
    memphisConnect: memphisConnect
}

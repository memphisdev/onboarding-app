const { memphis } = require('memphis-dev');
const { logger } = require('./loggerService');
const MEMPHIS_HOST = process.env.MEMPHIS_HOST; // create MQ connection string using environment variable
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
            consumerName: "resturant_service",
        });
        logger.info(`resturant_service consumer from orders station created`)

        delivery_producer = await memphis.producer({
            stationName: "ready_to_deliver",
            producerName: "resturant_service",
        });
        logger.info(`resturant_service producer to ready_to_deliver station created`)

        ordersStation_consumer.on("message", (order, context) => {
            // processing
            logger.info("---> A new order received:")
            console.log(JSON.parse(order.getData().toString()))
            order.ack();
            logger.info("---> The order is currently in preparation, and the customer will be notified when it's ready for delivery.")
            logger.info("---> The order is prepared and ready for delivery!")
            delivery_producer.produce({message: Buffer.from(order.getData().toString())})
        });

    }
    catch (ex) {
        logger.log('fatal',`Memphis - ${ex}`);
        process.exit();
    }
}

module.exports = {
    memphisConnect: memphisConnect
}

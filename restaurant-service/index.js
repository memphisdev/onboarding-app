const { startServer } = require('./src/app')
const { logger } = require('./src/services/loggerService')

startServer();
logger.info(`restaurant-service started.`)





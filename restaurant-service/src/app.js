require('dotenv').config()
const { memphisConnect} = require('./services/mqService');

startServer = () => {
    // Connect to Memphis.dev and consume orders
    memphisConnect();
}

module.exports = {
    startServer: startServer
}





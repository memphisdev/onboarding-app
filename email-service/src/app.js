require('dotenv').config()
const { memphisConnect} = require('./services/mqService')

const startServer = () => {
    memphisConnect();
}

module.exports = {
    startServer: startServer
}


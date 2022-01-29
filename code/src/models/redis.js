require('dotenv').config()
const redis = require('redis');

const db = redis.createClient({
    url: 'redis://' + process.env.REDIS_URL + ":" + process.env.REDIS_PORT
});

async function connect() {
    await db.connect()
}

async function disconnect() {
    await db.disconnect()
}

module.exports = {};
module.exports.disconnect = disconnect;
module.exports.connect = connect;
module.exports.db = db;
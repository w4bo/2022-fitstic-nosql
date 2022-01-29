require('dotenv').config()
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_URL],
    localDataCenter: process.env.CASSANDRA_DATACENTER,
    keyspace: process.env.CASSANDRA_KEYSPACE,
    authProvider: new cassandra.auth.PlainTextAuthProvider(process.env.CASSANDRA_USER, process.env.CASSANDRA_PWD)
});

async function query(s) {
    return await client.execute(s);
}

async function connect() {
    await client.connect()
}

async function disconnect() {
    await client.shutdown()
}

module.exports = {};
module.exports.disconnect = disconnect;
module.exports.connect = connect;
module.exports.query = query;
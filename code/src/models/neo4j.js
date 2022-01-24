require('dotenv').config()
const neo4j = require('neo4j-driver')
const client = neo4j.driver("bolt://" + process.env.NEO4J_URL + ":" + process.env.NEO4J_PORT, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PWD))
let session = null

async function connect() {
    try {
        session = client.session() // { database:'neo4j', defaultAccessMode: neo4j.session.READ }
    } catch (e) {
        console.error(e);
    }
}

async function disconnect() {
    await session.close()
    await client.close()
}

function movie01() {
    return cypher("MATCH (n) RETURN n")
}

function movie05() {
    return cypher("MATCH (n:Person)-->(:Movie) RETURN n")
}

async function cypher(cypherQuery) {
    return await session.run(cypherQuery);
}

module.exports = {};
module.exports.connect = connect;
module.exports.disconnect = disconnect;
module.exports.movie01 = movie01;
module.exports.movie05 = movie05;
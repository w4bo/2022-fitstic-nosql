require('dotenv').config()
const mysql = require('mysql');

const client = mysql.createConnection({
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    port: process.env.MYSQL_PORT,
    database: 'foodmart'
});

async function query(s) {
    return new Promise((resolve, reject) => {
        client.query(s, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

async function connect() {
}

async function disconnect() {
    await client.end();
}

module.exports = {};
module.exports.disconnect = disconnect;
module.exports.connect = connect;
module.exports.query = query;
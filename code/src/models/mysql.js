require('dotenv').config()
const mysql = require('mysql');

const client = mysql.createConnection({
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PWD,
    database: 'foodmart'
});

async function mysql01() {
    return await query("select * from customer");
}

async function query(s) {
    return new Promise((resolve, reject) => {
        client.query(s, (err, rows) => {
            if (err)
                return reject(err);
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
module.exports.mysql01 = mysql01;
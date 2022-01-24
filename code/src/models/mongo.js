require('dotenv').config()
const {MongoClient} = require('mongodb');

// const MONGO_USER = process.env.MONGO_USER
// const MONGO_PWD = process.env.MONGO_PWD
const MONGO_URL = process.env.MONGO_URL
// const URI = "mongodb://" + MONGO_USER + ":" + MONGO_PWD + "@" + MONGO_URL + ":27017/"
const URI = "mongodb://" + MONGO_URL + ":27017/"
const client = new MongoClient(URI);
let db = null

async function connect() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        db = client.db("exercises")
        db.restaurants = db.collection("restaurants")
    } catch (e) {
        console.error(e);
    }
}

async function disconnect() {
    await client.close()
}

async function getResult(obj) {
    return await obj.toArray();
}

function restaurants01() {
    return db.restaurants.find({}, {});
}

function restaurants02() {
    return db.restaurants.find({}, {projection: {borough: 1, cuisine: 1}});
}

function restaurants03() {
    return db.restaurants.find({}, {projection: {borough: 1, cuisine: 1, _id: 0}});
}

function restaurants04() {
    return db.restaurants.find({}, {projection: {borough: 1, cuisine: 1, 'address.street': 1, _id: 0}});
}

function restaurants05() {
    return db.restaurants.find({"address.zipcode": "11225"});
}

function restaurants06() {
    return db.restaurants.find({cuisine: "Hamburgers"});
}

function restaurants07() {
    return db.restaurants.find({cuisine: {$ne: "Hamburgers"}});
}

function restaurants07bis() {
    return db.restaurants.find({cuisine: {$not: {$in: ["Hamburgers"]}}});
}

function restaurants08() {
    return db.restaurants.find({cuisine: {$in: ["Hamburgers", "Bakery", "Irish"]}});
}

function restaurants08bis() {
    return db.restaurants.find({$or: [{cuisine: "Hamburgers"}, {cuisine: "Bakery"}, {cuisine: "Irish"}]});
}

function restaurants09() {
    return db.restaurants.find({cuisine: {$nin: ["Hamburgers", "Bakery", "Irish"]}});
}

function restaurants09bis() {
    return db.restaurants.find({cuisine: {$not: {$in: ["Hamburgers", "Bakery", "Irish"]}}});
}

function restaurants10() {
    return db.restaurants.find({cuisine: {$exists: false}});
}

module.exports = {};
module.exports.connect = connect;
module.exports.disconnect = disconnect;
module.exports.getResult = getResult;
module.exports.restaurants01 = restaurants01;
module.exports.restaurants02 = restaurants02;
module.exports.restaurants03 = restaurants03;
module.exports.restaurants04 = restaurants04;
module.exports.restaurants05 = restaurants05;
module.exports.restaurants06 = restaurants06;
module.exports.restaurants07 = restaurants07;
module.exports.restaurants07bis = restaurants07bis;
module.exports.restaurants08 = restaurants08;
module.exports.restaurants08bis = restaurants08bis;
module.exports.restaurants09 = restaurants09;
module.exports.restaurants09bis = restaurants09bis;
module.exports.restaurants10 = restaurants10;

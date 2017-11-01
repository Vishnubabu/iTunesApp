const NodeCache = require( 'node-cache' );
const myCache = new NodeCache();
const crypto = require('crypto');
const {promisify} = require('util');
const asyncGet = promisify(myCache.get).bind(myCache);

function encode(key) {
    return crypto.createHash('sha256').update(JSON.stringify(key)).digest('hex'); // TODO: make it better / effecient (generating key for objects)
}

function set(key, data, ttl) {
    try{
        key = encode(key);
        myCache.set(key, data, ttl);
    }catch(e) {
        //TODO log e
    }
}

async function get(key) {
    key = encode(key);
    data = await asyncGet(key);
}

module.exports = {
    get,
    set
}

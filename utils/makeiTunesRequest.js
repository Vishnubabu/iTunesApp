const request = require('request');
const cache = require('../utils/cache');
const config = require('../config');
const {promisify} = require('util');
const asyncGet = promisify(request.get);

module.exports = async (path, params) => {
    const input = {url: config.itunes.api_path + path, qs: params, json: true};

    let response = await cache.get(input);
    if (response) {
        return response;
    }

    response = await asyncGet(input);
    if (response.statusCode !== 200) {
        throw 'ERR: ' + JSON.stringify(response);
    }

    response = response.body.results;
    cache.set(input, response, config.itunes.cache_ttl);
    return response;
};

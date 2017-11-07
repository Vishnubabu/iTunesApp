const config = require('./config');
const express = require('express');
const app = express();

app.use(require('./routes'));
app.set('etag', false); //to avoid client caching of api response

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(config.server.host);

const router = require('express').Router();
const makeiTunesRequest = require('../utils/makeiTunesRequest');
const { query: checkQuery, validationResult } = require('express-validator/check');
const { matchedData, sanitizeQuery } = require('express-validator/filter');

const searchPath = '/search';

const validator = [
    sanitizeQuery('term').trim(),
    sanitizeQuery('entity').trim(),
    sanitizeQuery('media').trim(),
    sanitizeQuery('offset').toInt(),
    sanitizeQuery('limit').toInt(),

    checkQuery('term').not().isEmpty().withMessage('Search term missing.'),
    checkQuery('limit').optional().isInt({min: 1, max: 50}).withMessage('Limit should be integer between 1 and 50'),
    checkQuery('offset').optional().isInt({min: 0}).withMessage('Offset should be zero or positive integer'),
    checkQuery('entity').optional().not().isEmpty().withMessage('Entity should be some string'),
    checkQuery('media').optional().not().isEmpty().withMessage('Media should be some string')
];

const defaultParams = {
    limit: 50,
    offset: 0
};

router.get('/', validator, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    const params = Object.assign({}, defaultParams, matchedData(req));

    makeiTunesRequest(searchPath, params)
    .then(result => res.send(result))
    .catch(next);
});

module.exports = router;

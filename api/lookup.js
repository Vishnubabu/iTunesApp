const router = require('express').Router();
const makeiTunesRequest = require('../utils/makeiTunesRequest');
const { query: checkQuery, validationResult, oneOf } = require('express-validator/check');
const { matchedData, sanitizeQuery } = require('express-validator/filter');

const lookupPath = '/lookup';

const validator = [
    sanitizeQuery('id').trim(),
    sanitizeQuery('amgArtistId').trim(),
    sanitizeQuery('upc').trim(),
    sanitizeQuery('amgVideoId').trim(),
    sanitizeQuery('isbn').trim(),
    sanitizeQuery('amgAlbumId').trim(),

    oneOf([
        checkQuery('id').not().isEmpty(),
        checkQuery('amgArtistId').not().isEmpty(),
        checkQuery('upc').not().isEmpty(),
        checkQuery('amgVideoId').not().isEmpty(),
        checkQuery('isbn').not().isEmpty(),
        checkQuery('amgAlbumId').not().isEmpty()
    ], 'One of (id, amgArtistId, upc, amgVideoId, isbn, amgAlbumId) should be present')
];

router.get('/', validator, function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    const params = matchedData(req);

    makeiTunesRequest(lookupPath, params)
    .then(result => res.send(result))
    .catch(next);
});

module.exports = router;

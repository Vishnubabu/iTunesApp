const router = require('express').Router();

router.use('/search', require('./search'));
router.use('/lookup', require('./lookup'));

module.exports = router;

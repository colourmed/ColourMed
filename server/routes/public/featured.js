const express = require('express');
const router = express.Router({ mergeParams: true });

const { fetchFeaturedItems } = require('../../handlers/public/featured');

router.route('/').get(fetchFeaturedItems);

module.exports = router;

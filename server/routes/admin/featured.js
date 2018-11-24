const express = require('express');
const router = express.Router({ mergeParams: true });

const { removeFeaturedItem, addFeaturedItem } = require('../../handlers/admin/featured');

router.route('/add/:id').post(addFeaturedItem);
router.route('/remove/:id').delete(removeFeaturedItem);

module.exports = router;

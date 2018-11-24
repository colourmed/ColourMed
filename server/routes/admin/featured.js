const express = require('express');
const router = express.Router({ mergeParams: true });

const { removeFeaturedItem, addFeaturedItem, changeFeaturedItemsOrder } = require('../../handlers/admin/featured');

router.route('/updateOrder').post(changeFeaturedItemsOrder);
router.route('/add/:id').post(addFeaturedItem);
router.route('/remove/:id').delete(removeFeaturedItem);

module.exports = router;

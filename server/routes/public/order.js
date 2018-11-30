const express = require('express');
const router = express.Router({ mergeParams: true });

const { placeOrder } = require('../../handlers/public/order');

router.route('/').post(placeOrder);

module.exports = router;

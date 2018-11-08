const express = require('express');
const router = express.Router({ mergeParams: true });

const { getAllRobes } = require('../../handlers/public/robes');

router.route('/').get(getAllRobes);

module.exports = router;

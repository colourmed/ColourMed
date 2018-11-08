const express = require('express');
const router = express.Router({ mergeParams: true });

const { addRobe } = require('../../handlers/admin/robes');

router.route('/new').post(addRobe);

module.exports = router;

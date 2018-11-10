const express = require('express');
const router = express.Router({ mergeParams: true });

const { addRobe, removeRobe, editRobe } = require('../../handlers/admin/robes');

router.route('/new').post(addRobe);

router.route('/:id/')
  .put(editRobe)
  .delete(removeRobe);

module.exports = router;

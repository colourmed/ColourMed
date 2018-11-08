const db = require('../../models');

exports.getAllRobes = async function(req, res, next) {
  try {
    const robes = await db.Robe.find();
    return res.status(200).json(robes);
  } catch (err) {
    return next(err);
  }
};

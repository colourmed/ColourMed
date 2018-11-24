const db = require('../../models');

exports.fetchFeaturedItems = async function(req, res, next) {
  try {
    const featuredItems = await db.FeaturedItems.find();

    return res.status(200).json(featuredItems);
  } catch(err) {
    return next(err);
  }
}

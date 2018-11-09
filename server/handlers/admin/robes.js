const db = require('../../models');

exports.addRobe = async function(req, res, next) {
  try {
    let robe = await db.Robe.create({
      title: req.body.title,
      description: req.body.desctription,
      price: req.body.price,
      colors: req.body.colorPickerValues,
      sizes: req.body.sizesList,
      images: req.body.images,
      forMen: req.body.forMen
    });

    return res.status(200).json(robe);
  } catch (err) {
    return next(err);
  }
};

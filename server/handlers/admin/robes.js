const db = require('../../models');

exports.addRobe = async function(req, res, next) {
  try {
    let robe = await db.Robe.create({
      title: req.body.title,
      description: req.body.description,
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

exports.editRobe = async function(req, res, next) {
  try {
    const robeId = req.params.id;

    await db.Robe.updateOne(
      { _id: robeId },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          colors: req.body.colorPickerValues,
          sizes: req.body.sizesList,
          images: req.body.images,
          forMen: req.body.forMen
        }
      }
    );

    const updatedRobe = await db.Robe.findOne({ _id: robeId });

    return res.status(200).json(updatedRobe);
  } catch (err) {
    return next(err);
  }
};

exports.removeRobe = async function(req, res, next) {
  try {
    const robeId = req.params.id;
    await db.Robe.findOneAndDelete({ _id: robeId });

    return res.status(200).json(robeId);
  } catch (err) {
    return next(err);
  }
};

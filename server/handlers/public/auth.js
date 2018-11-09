require('dotenv').load();
const db = require('../../models');
const jwt = require('jsonwebtoken');

exports.login = async function(req, res, next) {
  try {
    let admin = await db.Admin.findOne({
      email: req.body.email
    });

    let { id } = admin;

    let isMatch = await admin.comparePassword(req.body.password);

    if (isMatch) {
      let token = jwt.sign(
        {
          id
        },
        process.env.SECRET_KEY
      );

      return res.status(200).json({
        id,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Email-ul sau parola nu este corecta.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Email-ul sau parola nu este corecta.'
    });
  }
};

exports.signup = async function(req, res, next) {
  try {
    let admin = await db.Admin.create(req.body);
    let { id } = admin;

    let token = jwt.sign(
      {
        id
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      token
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message =
        'Emailul este deja folosit.';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

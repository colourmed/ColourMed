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
        message: 'Invalid  Email/Password.'
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid  Email/Password.'
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
        'Sorry, that email has already been used. Are you trying to log in?';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

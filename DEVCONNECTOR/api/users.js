const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const gravatr = require('gravatar');
const bycrptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');
const { check, validationResult } = require('express-validator');

const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: config.get('apiKey')
    }
  })
);

const MIN_CHAR = 6;
const BAD_RESPONSE_STAUTS = 400;

// @route   Post api/sekers
// @desc    Register User route
///         succses: sending mail to user  with link to passwod page
//          faild: return custom error msg
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is Requird'),
    check('adress', 'Adresses is required')
      .not()
      .isEmpty(),
    check('phonNumber', 'Phone Number is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    /// If there any error from the midd condition
    if (!errors.isEmpty()) {
      return res.status(BAD_RESPONSE_STAUTS).json({ errors: errors.array() }); //return the error the Error
    }

    //// Get data on the user from the request
    const { name, email, password, adress, phonNumber } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(BAD_RESPONSE_STAUTS)
          .json({ errors: [{ msg: 'User Alredy exist' }] });
      }

      const avatar = gravatr.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      //Create User
      user = new User({
        name,
        email,
        adress,
        phonNumber,
        password,
        avatar
      });

      ///Crypt password to hash with 10 salt
      user.password = await bycrptjs.hash(password, 10);

      ///Create token for the user that apper on the Mail
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          console.log(err);
          res.json({ msg: error.message });
        }
        const token = buffer.toString('hex');
        user.token = token;
        user.expireToken = Date() + 3600000;
        await user.save();

        await transporter.sendMail(
          {
            to: user.email,
            from: 'refael777@sekerShekel.com',
            subject: 'Password Confirm',
            html: `<p> to complete regerstrion click on the link </p>
            <p>Click Here<a href="http://localhost:5000/api/users/${token}">link</a></p>
            <p><a href="http://localhost:5000/api/users/${token}">http://localhost:5000/api/users/${token}</a></p>
            `
          },
          err => console.log(err)
        );
      });
      res.json({ msg: 'sucss' });
    } catch (error) {
      res.json({ msg: error.message });
    }
  }
);

// @route   Get api/users/password page
// @desc    Complete registeration procces for the user User route
// @access  Public

// @route   Post api/users/spesific user
// @desc    Complete registeration procces for the user User route
///         succses: return Jwt token for this spesific user
//          faild: return custom error msg
// @access  Public
router.post('/:token', async (req, res) => {
  try {
    const token = req.params.token;
    let user = await User.findOne({ token });
    if (!user) {
      res.json({ msg: 'user not found' });
    }
    if (user.expireToken > Date.now()) {
      User.deleteOne({ user });
      res.json({ msg: 'Time of token is expire please register agian' });
      ///Delete user
    }

    const { password } = req.body;
    user.password = await bycrptjs.hash(password, 10);
    user.token = undefined;
    user.expireToken = undefined;
    await user.save();

    const Payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      Payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(err);
    res.status(400).json({ msg: err });
  }
});

module.exports = router;

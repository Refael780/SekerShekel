const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const gravatr = require('gravatar');
const bycrptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const MIN_CHAR = 6;
const BAD_RESPONSE_STAUTS = 400;
// @route   Post api/sekers
// @desc    Register User route
// @access  Public

router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);

    /// If there any error from the midd condition
    if (!errors.isEmpty()) {
      return res.status(BAD_RESPONSE_STAUTS).json({ errors: errors.array() }); //return the error the Error
    }

    //// Get data on the user from the request
    const { name, email, password } = req.body;

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

      user = new User({
        name,
        email,
        password,
        avatar
      });
      user.password = await bycrptjs.hash(password, 10);

      await user.save();

      const Payload = {
        id: user.id
      };

      res.send('Users route');
    } catch (error) {
      res.send(error.message);
    }
  }
);

module.exports = router;

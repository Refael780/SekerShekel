const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/Users');
const bycrptjs = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const BAD_RESPONSE_STAUTS = 400;

// @route   GET api/auth
// @desc    get user routh by middlware auth that translate token to user
//          succses: return user(json)
//          faild: return custom error msg
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

// @route   Post api/auth
// @desc    Login User with auth  route
//          succses: return token(json)
//          faild: return custom error msg
// @access  Public
router.post(
  '/',
  ///middlware chack from express-validator
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password are requird').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req); //get error from the chack's middleware

    /// If there any error from the midd condition
    if (!errors.isEmpty()) {
      return res.status(BAD_RESPONSE_STAUTS).json({ errors: errors.array() }); //return the error the Error
    }

    //// Get data on the user from the request
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(BAD_RESPONSE_STAUTS)
          .json({ errors: [{ msg: 'Invalid Carditinal' }] });
      }
      const isMatch = await bycrptjs.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(BAD_RESPONSE_STAUTS)
          .json({ errors: [{ msg: 'Invalid Carditinal' }] });
      }

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
      res.json({ msg: error.message });
    }
  }
);

module.exports = router;

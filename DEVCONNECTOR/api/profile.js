const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const User = require('../models/Users');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    Get the current profile of the user
//          Succses:return the profile(json)
//          faild:return error msg(json)
// @access  private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findById({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'Profile dosent exist' });
    }
    return res.json(profile);
  } catch (error) {
    console.log('Server Error');
    return res.status(500).json({ msg: 'Server Error' });
  }
});

// @route   POST api/profile/me
// @desc    Create or update current profile of the user
//          Succses:return the profile(json)
//          faild:return error msg(json)
// @access  private
router.post(
  '/',
  [
    auth,
    check('status')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty) {
      return res.status(400).json({ err: err.array() });
    }

    const {
      status,
      kidsAmount,
      workAT,
      yearsOfEducation,
      nation,
      education,
      educationalInstitution,
      profession
      //Seker that he do
    } = req.body;

    const ProfileFields = {};
    ///Get data from the req
    ProfileFields.user = req.user.id;

    if (status) {
      ProfileFields.status = status;
    }
    if (kidsAmount) {
      ProfileFields.kidsAmount = kidsAmount;
    }
    if (workAT) {
      ProfileFields.workAT = workAT;
    }
    if (yearsOfEducation) {
      ProfileFields.yearsOfEducation = yearsOfEducation;
    }
    if (nation) {
      ProfileFields.nation = nation;
    }

    if (education) {
      ProfileFields.education = education;
    }

    if (educationalInstitution) {
      ProfileFields.educationalInstitution = educationalInstitution;
    }
    if (profession) {
      ProfileFields.profession = profession.split(',').map(pro => pro.trim());
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: ProfileFields },
          { new: true }
        );

        return res.json(profile);
      }
      profile = new Profile(ProfileFields);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.log(err);
      return res.status(400).json('Update Or Create User Faild');
    }
  }
);

// @route   GET api/profile/
// @desc    Get all profiles
//          Succses:return all profile(json)
//          faild:return error msg(json)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    console.log(profiles);

    return res.json(profiles);
  } catch (error) {
    console.log(error);

    return res.status(500).json('Server Error');
  }
});

// @route   GET api/profile/user/:userId
// @desc    Get all profiles
//          Succses:return all profile(json)
//          faild:return error msg(json)
// @access  Public
router.get('/users/:userId', async (req, res) => {
  try {
    let profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    return res.json(profile);
  } catch (error) {
    if (error.kind == 'ObjectID') {
      res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;

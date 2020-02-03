const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Qut = require('../models/Qut');
const Seker = require('../models/Seker');
const User = require('../models/Users');
const auth = require('../middleware/auth');
const NOT_FOUND = -1 || undefined || null;

// @route   GET api/sekers
// @desc    get all Surveys
// @access  Public
router.get('/', async (req, res) => {
  const Allseker = await Seker.find().catch(err => {
    return res.status(500).json('Server Error' + { msg: err });
  });
  res.json(Allseker);
});

// @route   POST api/sekers
// @desc    Create new Survey
// @access  Public
router.post(
  '/',
  [
    check('title', 'title is required')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const { title, surveyQuts, period, formType, active } = req.body;
    // the two schema Seker and qut that nasted in Seker
    const SekerLocal = {};
    // fill the Seker Object
    if (title) SekerLocal.title = title;
    if (formType) SekerLocal.formType = formType;
    if (active) SekerLocal.active = active;
    if (period) SekerLocal.period = period;
    SekerLocal.surveyQuts = [];
    if (SekerLocal.surveyQuts) SekerLocal.surveyQuts = surveyQuts;

    ///crate qut mongoose obj and insert it to sekerLocal
    for (let i = 0; i <= Array(SekerLocal.surveyQuts).length; i++) {
      SekerLocal.surveyQuts[i].qut = new Qut(SekerLocal.surveyQuts[i].qut);
      await SekerLocal.surveyQuts[i].qut.save().catch(err => {
        res.status(404).json({ msg: err });
      });
    }

    ///crate Seker mongoose obj
    const seker = new Seker(SekerLocal);
    await seker.save();

    return res.json(seker);
  }
);

// @route   POST api/sekers
// @desc    user answers on spesific Seker -update Seker
// @access  Private
router.post('/:title', auth, async (req, res) => {
  console.log('ENTER TO USER ANSWER');

  //title is uniqe in every surves
  const title = req.params.title;
  const { ...allField } = req.body;

  let localSurveyQuts = [];

  // find the user in db (user that answer)
  let user = await User.findById(req.user.id).catch(err =>
    res.status(500).json(err)
  );
  ///find the spesfic Seker in db
  let seker = await Seker.findOne({ title: title }).catch(err =>
    res.status(500).json('Server Erorr-Seker')
  );

  // if there NOT found
  if (!seker) {
    return res.status(400).json({ msg: 'סקר לא נמצא' });
  }

  //find if the user already fill this spesific Survey
  const findUser = seker.userAnswer.filter(element => element == user.id);
  if (findUser.length != 0) {
    return res.json({ msg: 'This User already fill this Seker' });
  }

  // Get the Qustion id From the seker
  const qustionsID = seker.surveyQuts.map(el => el.qut);
  localSurveyQuts = allField.surveyQuts;

  // if there NOT qustion Obj in the survys
  if (!localSurveyQuts) {
    return res.status(400).json({ msg: 'אין שאלות בסקר' });
  }

  //return res.json(localSurveyQuts[0].qut);
  // UPDATE the Seker db's
  localSurveyQuts.forEach(async (el, index, arr) => {
    //Create  Qut TYPE obj

    ///chackin if the qustios exist and save it for update the "choosing Amount field in DB"
    const qustion = await Qut.findById(
      qustionsID[index],
      async (err, found) => {
        if (err) {
          return res.json(err);
        }
        if (!found) {
          return res.json({ NOT_FOUND: el.qut });
        }
        // return res.json({ msg1: el });
      }
    ).catch(err => {
      return res.json({ msg: el.qut });
    });

    //  return res.json(el);
    //find for which of the answers is choosen

    choosenAnswer = el.qut.answers.filter(element => {
      if (element.choosen == 'true') {
        return element;
      }
    });

    //find the index of the answer that choosen
    let indexs = el.qut.answers.findIndex(element => element.choosen == 'true');

    //if some answer chacked
    if (choosenAnswer !== NOT_FOUND && indexs !== NOT_FOUND) {
      //find in DB the Qustion that need to be Updated
      await Qut.find(qustion, async (err, foundQust) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: 'Faild to Find qustion /n CONSOLE ERR: ' + err });
        }
        if (!foundQust || foundQust.length <= 0) {
          return res.status(404).json({ msg: 'Qustion NOT found' });
        }
        console.log(indexs);

        // UPDATE The Count of the answer that choosen
        foundQust[0].answers[indexs].choosenAmount++;
        foundQust[0].answers[indexs].choosen = false;

        await foundQust[0].save().catch(eror => {
          return res.status(500).json({ msg: eror });
        });
      }).catch(err => {
        return res
          .status(400)
          .json({ msg: 'Faild to Update qustion /n CONSOLE ERR: ' + err });
      });
    } else return res.status(400).json(` ${qustion.index} שאלה מס לא נענתה .`);
  });

  //PUSH THE USER TO SEKER
  seker.userAnswer.push(user);
  await seker
    .save()
    .catch(err =>
      res.status(400).json({ msg: 'Faild to Save User /n CONSOLE ERR: ' + err })
    );

  //PUSH THE SEKER TO USER
  user.sekers.push(seker);
  await user
    .save()
    .catch(err =>
      res
        .status(400)
        .json({ msg: 'Faild to Save Seker in The User /n CONSOLE ERR: ' + err })
    );

  return res.json(seker);
});

// @route   GET api/sekers
// @desc    get all user that fill spesific user Surveys
// @access  Public
router.get('/users', async (req, res) => {
  const { title } = req.body;
  const Allusers = await Seker.findOne({ title: title })
    .populate('userAnswer')
    .catch(err => res.json({ msg: 'Server Error' }));
  if (!Allusers) {
    return res.status(400).json({ msg: 'לא מולא עדיין' });
  }
  return res.json(Allusers);

  //  res.json(Allseker);
});

// @route   Get api/users/password page
// @desc    get all survys that spesfic user fill
// @access  Public
router.get('/sekers', async (req, res) => {
  const { email } = req.body;

  const AllSeker = await User.findOne({ email: email })
    .populate('sekers')
    .catch(err => res.json({ msg: 'Server Error' }));
  if (!AllSeker) {
    return res.status(400).json({ msg: 'אף משתמש לא מילא' });
  }
  return res.json(Allusers);
});

module.exports = router;

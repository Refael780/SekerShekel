const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Qut = require('../models/Qut');
const Seker = require('../models/Seker');
const Profile = require('../models/Profile');
const User = require('../models/Users');
const auth = require('../middleware/auth');
const NOT_FOUND = -1 || undefined || null || [];

// @route   GET api/sekers
// @desc    get all Surveys
// @access  Public
router.get('/', async (req, res) => {
  const Allseker = await Seker.find().catch(err => {
    return res.status(500).json('Server Error ' + { msg: err });
  });
  res.json(Allseker);
});

// @route   GET api/sekers
// @desc    get Spesific surveys
// @access  Public
router.get('/:title', async (req, res) => {
  const title = req.params.title;

  const seker = await Seker.findOne({ title: title.toString().trim() }).catch(
    err => {
      return res.status(500).json('Server Erorr-Seker');
    }
  );

  // if there NOT Seker found
  if (!seker) {
    console.log('NOT FOUND');

    return res.status(400).json({ msg: 'סקר לא נמצא' });
  }
  res.json(seker);
});

// @route   POST api/seker
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
    console.log('ENTER TO SEKER');
    console.log(req.body);

    const { title, period, formType, active, sekerImg } = req.body;
    const surveyQuts = req.body.surveyQuts;
    // the two schema Seker and qut that nasted in Seker
    const SekerLocal = {};
    // fill the Seker Object
    if (title) SekerLocal.title = title;
    console.log('TITLE: ' + SekerLocal.title);

    if (sekerImg) SekerLocal.sekerImg = sekerImg;
    console.log('sekerImg: ' + SekerLocal.sekerImg);

    if (formType) SekerLocal.formType = formType;
    if (active) SekerLocal.active = active;
    if (period) SekerLocal.period = period;
    SekerLocal.surveyQuts = [];
    if (surveyQuts) SekerLocal.surveyQuts = [...surveyQuts];
    console.log('=============SekerLocal================');

    console.log(SekerLocal);
    console.log('=======================================');
    console.log('=============SekerLocal.surveyQuts================');

    console.log(SekerLocal.surveyQuts);
    console.log('=======================================');

    ///crate qut mongoose obj and insert it to sekerLocal
    for (let i = 0; i < SekerLocal.surveyQuts.length; i++) {
      try {
        console.log('i: ' + i);
        SekerLocal.surveyQuts[i].qut = new Qut(SekerLocal.surveyQuts[i].qut);
      } catch (error) {
        return res.json(error);
      }

      await SekerLocal.surveyQuts[i].qut.save().catch(err => {
        res.status(404).json({ msg: err });
      });
    }

    ///crate Seker mongoose obj
    const seker = new Seker(SekerLocal);
    await seker.save().catch(err => {
      return res.json(err);
    });

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

  const allField = {
    surveyQuts: [...req.body]
  };

  let localSurveyQuts = [];

  // find the user in db (user that answer)
  let user = await User.findById(req.user.id).catch(err => {
    return res.status(500).json(err);
  });
  // if there NOT Seker found
  if (!user) {
    return res.status(400).json({ msg: 'משתמש לא נמצא' });
  }

  let profile = await Profile.findOne({
    user: req.user.id
  })
    .populate('user', ['name', 'avatar'])
    .catch(err => {
      return res.status(500).json({ mssssg: err });
    });

  if (!profile) {
    return res.status(400).json({ msg: 'פרופיל לא נמצא' });
  }
  ///find the spesfic Seker in db
  let seker = await Seker.findOne({ title: title }).catch(err => {
    return res.status(500).json('Server Erorr-Seker');
  });

  // if there NOT Seker found
  if (!seker) {
    return res.status(400).json({ msg: 'סקר לא נמצא' });
  }
  //find if the user already fill this spesific Survey
  // const findUser = seker.userAnswer.filter(element => element == user.id);
  // if (findUser.length != 0) {
  //   return res.json({ msg: 'This User already fill this Seker' });
  // }

  // Get the Qustion id From the seker

  const qustionsID = await seker.surveyQuts.map(el => el.qut);

  localSurveyQuts = [...allField.surveyQuts];

  // if there NOT qustion Obj in the survys
  if (!localSurveyQuts) {
    return res.status(400).json({ msg: 'אין שאלות בסקר' });
  }

  // UPDATE the Seker db's
  localSurveyQuts.forEach(async (el, index, arr) => {
    //Create  Qut TYPE obj

    ///chackin if the qustios exist and save it for update the "choosing Amount field in DB"
    const qustion = await Qut.findById(qustionsID[index], (err, found) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (!found) {
        return res.status(500).json({ NOT_FOUND: el.qut });
      }

      // return res.json({ msg1: el });
    }).catch(err => {
      return res.status(500).json({ msg: 'SOME ERROR' });
    });

    //  return res.json(el);
    //find for which of the answers is choosen
    choosenAnswer = await el.qut.answers.filter(element => {
      if (element.choosen == true) {
        return element;
      }
    });

    //find the index of the answer that choosen

    let indexs = await el.qut.answers.findIndex(
      element => element.choosen == true
    );
    console.log('178');
    console.log(qustion);

    //if some answer chacked
    if (choosenAnswer !== NOT_FOUND && indexs !== NOT_FOUND) {
      //find in DB the Qustion that need to be Updated
      console.log('182');
      await Qut.find(qustion, async (err, foundQust) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: 'Faild to Find qustion /n CONSOLE ERR: ' + err });
        }

        if (!foundQust || foundQust.length <= 0) {
          return res.status(404).json({ msg: 'Qustion NOT found' });
        }
        console.log('203');

        // UPDATE The Count of the answer that choosen
        foundQust[0].answers[indexs].choosenAmount++;
        foundQust[0].answers[indexs].choosen = false;

        //Save the Answer with user
        let answerOfUSer = {
          Filluser: user,
          fullAnswer: foundQust[0].answers[indexs].answer
        };

        await foundQust[0].uAnswer.push(answerOfUSer);
        await foundQust[0].save().catch(eror => {
          return res.status(500).json({ msg: eror });
        });
      }).catch(err => {
        return res
          .status(400)
          .json({ msg: 'Faild to Update qustion /n CONSOLE ERR: ' + err });
      });
    } else {
      console.log('=====NOT AMARICAN ==================');
      console.log(qustion);
      let answerOfUSer = {
        Filluser: user,
        fullAnswer: qustion.answers[indexs].answer
      };
      await qustion.uAnswer.push(answerOfUSer);
      await qustion.save().catch(err => {
        return res.json('NOT Amrican err');
      });
      /// TO-DO
      /// Save the answer and the user for regular qustion (non amarican)
      console.log('=====NOT AMARICAN ==================');
    }
  });
  console.log('221');

  //PUSH THE USER TO SEKER
  seker.userAnswer.push(user);
  await seker.save().catch(err => {
    console.log('SOMTHINGWRONG');

    return res
      .status(400)
      .json({ msg: 'Faild to Save User /n CONSOLE ERR: ' + err });
  });
  //PUSH THE SEKER TO USER
  console.log('233');
  user.sekers.push(seker);
  await user.save().catch(err => {
    return res
      .status(400)
      .json({ msg: 'Faild to Save Seker in The User /n CONSOLE ERR: ' + err });
  });
  console.log('240');
  //Push the seker to profile && push profile to the seker
  if (profile) {
    profile.sekers.push(seker);
    await profile.save().catch(err => {
      return res.status(400).json({
        msg: 'Faild to Save Seker in The Profile User /n CONSOLE ERR: ' + err
      });
    });
    console.log('249');
    //PUSH THE PROFILE TO SEKER
    seker.profileAnswer.push(profile);
    await seker.save().catch(err => {
      return res
        .status(400)
        .json({ msg: 'Faild to Save User /n CONSOLE ERR: ' + err });
    });
  }

  return res.json(seker);
});

// @route   GET api/seker/Data
// @desc    get all data from
// @access  Public
router.get('/:title/data', async (req, res) => {
  console.log('title sadfsdfsdfdsf');

  let surveyData = [];
  const title = req.params.title;

  const surveyQuts = await Seker.findOne({ title: title.toString().trim() })
    .select('surveyQuts')
    .catch(err => res.json(err));

  const allQustionID = surveyQuts.surveyQuts.map(el => el.qut);

  allQustionID.forEach(async (el, index, arr) => {
    await Qut.findById(
      el,
      [
        'qust',
        'isChoosenAnswer',
        'answers.choosenAmount',
        'answers.choosen',
        'answers.answer'
      ],
      (err, found) => {
        if (err) {
          return res.status(500).json({ err: err });
        }
        if (!found) {
          return res.json('qustions dont found');
        }

        surveyData.push(found);
        if (surveyData.length == allQustionID.length) {
          console.log('surveyData.length: ' + surveyData.length);

          return res.json(surveyData);
        }
      }
    );
  });
});

// @route   GET api/seker/users
// @desc    get all user that fill spesific user Surveys
// @access  Public
router.get('/users', async (req, res) => {
  const { title } = req.body;
  const Allusers = await Seker.findOne({ title: title })
    .populate('userAnswer')
    .catch(err => res.json({ msg: 'Server Error' }));
  if (!Allusers) {
    return res.status(400).json({ msg: 'לא  מולא עדיין' });
  }
  return res.json(Allusers);
});

// @route   Get api/users/password page
// @desc    get all survys that spesfic user fill
// @access  Public
router.get('/sekers', async (req, res) => {
  const { email } = req.body;

  const AllSeker = await User.findOne({ email: email })
    .populate('sekers')
    .catch(err => res.json({ msg: 'Server  Error' }));
  if (!AllSeker) {
    return res.status(400).json({ msg: 'אף משתמש לא מילא' });
  }
  return res.json(Allusers);
});
// const findUser = seker.userAnswer.filter(element => element == user.id);
// if (findUser.length != 0) {
//   return res.json({ msg: 'This User already fill this Seker' });
// }
module.exports = router;

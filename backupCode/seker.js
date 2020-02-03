// allAnswers: [
//     {
//         answers: {
//             answer: String,
//             optionAnswerNumber: Number,
//             choosen: {
//                 type: Number,
//                 default: 0
//             }
//         }
//     }
// ]

// await Seker.create(SekerLocal, async (err, seker) => {
//   if (err) {
//     return res.json(err);
//   } else {
//     await qut.save();
//     seker.title = 'else';

//     seker.surveyQuts = [];
//     seker.surveyQuts.push(qut);
//     await seker.save();
//     return res.json(seker);
//   }
// });

//await seker.save();

// //const express = require('express');
// const router = express.Router();
// const { check, validationResult } = require('express-validator');
// const Qut = require('../models/Qut');
// const Seker = require('../models/Seker');

// // @route   GET api/sekers
// // @desc    Test route
// // @access  Public

// router.get('/', (req, res) => res.send('Seker route'));

// router.post(
//     '/',
//     [
//         check('title', 'title is required')
//             .not()
//             .isEmpty()
//     ],
//     async (req, res) => {
//         console.log('ENTER');
//         const {
//             title,
//             qust,
//             surveyQuts,
//             index,
//             answers,
//             period,
//             formType,
//             active
//         } = req.body;

//         // the two schema Seker and qut that nasted in Seker
//         const SekerLocal = {};
//         const qutLocal = {};

//         // fill the Seker Object
//         if (title) SekerLocal.title = title;
//         if (formType) SekerLocal.formType = formType;
//         if (active) SekerLocal.active = active;
//         if (period) SekerLocal.period = period;
//         SekerLocal.surveyQuts = [];

//         // fill qut Object
//         if (qust) qutLocal.qust = qust;
//         if (index) qutLocal.index = index;
//         if (answers) qutLocal.answers = answers;

//         ///crate qut mongoose obj
//         const qut = new Qut(qutLocal);
//         await qut.save();

//         // push the qut to Seker
//         SekerLocal.surveyQuts.push(qut);

//         ///crate Seker mongoose obj
//         const seker = new Seker(SekerLocal);
//         await seker.save();

//         return res.json(seker);
//     }
// );
// module.exports = router;
// //

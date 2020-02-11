const mongoose = require('mongoose');

const QutSchema = new mongoose.Schema({
  qust: {
    type: String
  },
  index: Number,
  isChoosenAnswer: {
    type: Boolean,
    default: true
  },
  answers: [
    {
      answer: {
        type: String
      },

      optionAnswerNumber: {
        type: Number
      },
      choosen: {
        type: Boolean,
        default: false
      },
      choosenAmount: {
        ////How many choose this one
        type: Number,
        default: 0
      }
    }
  ]
});
module.exports = Qut = mongoose.model('qut', QutSchema);

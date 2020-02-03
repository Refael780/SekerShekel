const mongoose = require('mongoose');

const SekerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  surveyQuts: [
    {
      qut: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'qut'
      }
    }
  ],

  userAnswer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  period: {
    start: {
      type: Date,
      default: Date.now()
    },
    end: {
      type: String,
      default: Date.now + 360000000
    }
  },
  formType: String,
  active: {
    type: Boolean,
    default: true
  }
});
module.exports = Seker = mongoose.model('seker', SekerSchema);

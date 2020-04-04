const mongoose = require('mongoose');

const SekerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  sekerImg: String,
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
  profileAnswer: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  period: {
    start: {
      type: Date,
      default: Date()
    },
    end: {
      type: String,
      default: new Date(Date.now() + 332442343)
    }
  },
  formType: String,
  active: {
    type: Boolean,
    default: true
  }
});
module.exports = Seker = mongoose.model('seker', SekerSchema);

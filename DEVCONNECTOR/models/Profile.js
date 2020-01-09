const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  status: {
    type: String
  },
  kidsAmount: {
    type: String
  },
  workAT: {
    type: String
  },
  yearsOfEducation: {
    type: String
  },
  nation: {
    type: String
  },
  education: {
    type: String
  },
  educationalInstitution: {
    type: String
  },
  profession: {
    type: [String]
  }
});
module.exports = Profile = mongoose.model('Profile', ProfileSchema);

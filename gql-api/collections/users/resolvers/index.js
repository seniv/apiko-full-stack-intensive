const { User } = require('../model');
const { Question } = require('../../questions/model');
const { Vote } = require('../../votes/model');

module.exports = {
  Query: {
    user: (_, { _id }) => User.findById(_id),
    users: (_, { limit }) => User.find({}, {}, { limit }),
  },
  User: {
    fullName: ({ profile } = {}) => profile.fullName,
    // Fetch user questions
    questions: ({ _id }, { limit, skip }) =>
      Question.find(
        { createdBy: _id },
        {},
        { limit, skip, sort: { createdAt: -1 } },
      ),
    votes: ({ _id }) => Vote.find({ createdBy: _id }),
  },
};

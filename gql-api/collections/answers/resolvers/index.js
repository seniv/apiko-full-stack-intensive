const { Answer } = require('../model');
const { User } = require('../../users/model');
const { Vote } = require('../../votes/model');


module.exports = {
  Query: {
    answers: () => Answer.find({}),
  },
  Answer: {
    author: ({ createdBy }) => User.findById(createdBy),
    votes: ({ _id }) => Vote.find({ answerId: _id }),
  },
};

const Answer = require('./answer/model');
const Question = require('./question/model');
const User = require('./user/model');
const Vote = require('./vote/model');

// export all models as one object
module.exports = {
  Answer,
  Question,
  User,
  Vote,
};
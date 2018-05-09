const _ = require('lodash');

const create = ({ Question }) => async (req, res, next) => {
  try {
    const question = new Question();
    _.extend(question, req.body);
    await question.save();

    return res.status(200).send({ question });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

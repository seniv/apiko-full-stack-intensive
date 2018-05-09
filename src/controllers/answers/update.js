const _ = require('lodash');

const update = ({ Answer }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const answer = await Answer.findOne({ _id });
    _.extend(answer, req.body);
    await answer.save();
    res.status(200).send({ answer });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

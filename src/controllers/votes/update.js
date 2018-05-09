const _ = require('lodash');

const update = ({ Vote }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const vote = await Vote.findOne({ _id });
    _.extend(vote, req.body);
    await vote.save();
    res.status(200).send({ vote });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

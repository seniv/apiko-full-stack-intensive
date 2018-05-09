const _ = require('lodash');

const create = ({ Vote }) => async (req, res, next) => {
  try {
    const vote = new Vote();
    _.extend(vote, req.body);
    await vote.save();

    return res.status(200).send({ vote });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

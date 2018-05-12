const _ = require('lodash');

const create = ({ Answer }) => async (req, res, next) => {
  try {
    const answer = new Answer();
    _.extend(answer, req.body, {
      createdById: req.user.id,
    });
    await answer.save();

    return res.status(200).send({ answer });
  } catch (error) {
    next(error);
  }
};

module.exports = create;

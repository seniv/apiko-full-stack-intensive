const _ = require('lodash');
const { Forbidden } = require('rest-api-errors');

const update = ({ Answer }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const answer = await Answer.findOne({ _id });
    if(answer.createdById != req.user.id) {
      throw new Forbidden(403);
    }
    _.extend(answer, req.body);
    await answer.save();
    res.status(200).send({ answer });
  } catch (error) {
    next(error);
  }
};

module.exports = update;

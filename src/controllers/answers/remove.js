const { Forbidden } = require('rest-api-errors');

const remove = ({ Answer }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const answer = await Answer.findOne({ _id });
    if(answer.createdById != req.user.id) {
      throw new Forbidden(403);
    }
    await Answer.remove({ _id });
    res.status(200).send({ answer });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

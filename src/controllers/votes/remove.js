const { Forbidden } = require('rest-api-errors');

const remove = ({ Vote }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const vote = await Vote.findOne({ _id });
    if(vote.createdById != req.user.id) {
      throw new Forbidden(403);
    }
    await Vote.remove({ _id });
    res.status(200).send({ vote });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

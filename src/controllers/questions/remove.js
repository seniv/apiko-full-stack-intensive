const { Forbidden } = require('rest-api-errors');

const remove = ({ Question }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const question = await Question.findOne({ _id });
    if(question.createdById != req.user.id) {
      throw new Forbidden(403);
    }
    await Question.remove({ _id });
    res.status(200).send({ question });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

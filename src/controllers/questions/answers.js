const getAnswers = ({ Answer }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const answers = await Answer.find({ questionId: _id });
    res.status(200).send({ answers });
  } catch (error) {
    next(error);
  }
};

module.exports = getAnswers;

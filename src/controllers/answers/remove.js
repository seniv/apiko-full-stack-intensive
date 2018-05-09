const remove = ({ Answer }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const answer = await Answer.findOne({ _id });
    await Answer.remove({ _id });
    res.status(200).send({ answer });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;

const remove = ({ Vote }) => async (req, res, next) => {
  const { _id } = req.params;
  try {
    const vote = await Vote.findOne({ _id });
    await Vote.remove({ _id });
    res.status(200).send({ vote });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
